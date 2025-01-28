import fs from "fs/promises";
import { createReadStream } from "fs";
import crypto from "crypto";

import { OpenAIClient } from "./openai_client.js";

export class AgentTrainer extends OpenAIClient {
  constructor() {
    super();
  }

  preprocessPostsToJSONL = (posts, author) => {
    // chat-formatted data (required for chat models)
    const jsonlData = posts.map((post) => ({
      messages: [
        {
          role: "system",
          content: `You are an AI trained to write tweets in the exact style of ${author}.`,
        },
        { role: "user", content: "Write a tweet in your style." },
        {
          role: "assistant",
          content: post.text.replace(/https?:\/\/\S+/g, "").trim(),
        },
      ],
    }));

    const jsonlString = jsonlData
      .map((entry) => JSON.stringify(entry))
      .join("\n");

    return jsonlString;
  };

  getFineTunedState = async (jobId) => {
    const response = await this.openai.fineTuning.jobs.retrieve(jobId);

    console.log("Fine-tune status:", response.status);
    return response;
  };

  // upload file that the agent is trained against
  uploadTrainingData = async (jsonlString) => {
    const tempFilePath = `./temp_training_data_${crypto.randomUUID()}.jsonl`; // create temp file

    await fs.writeFile(tempFilePath, jsonlString);
    const stream = createReadStream(tempFilePath);

    const response = await this.openai.files.create({
      purpose: "fine-tune",
      file: stream,
    });

    await fs.unlink(tempFilePath); // delete temp file
    return response.id;
  };

  // start agent creation process
  createFineTune = async (trainingFileId) => {
    const response = await this.openai.fineTuning.jobs.create({
      training_file: trainingFileId, // JSONL file with posts
      model: this.chatModel,
    });

    console.log("Fine-tuning started:", response.id);
    return response.id; // Fine-tuning job ID
  };

  // use agent to create a post
  promptFineTunedModel = async (modelId, prompt, author) => {
    const systemMessage = `
      You are an AI trained to write tweets in the exact style of ${author}. 
      Mimic their unique voice, tone, vocabulary, and typical content structure. 
      Your response MUST be a single, complete tweet, no longer than 280 characters.
      Include appropriate formatting such as line breaks, emojis, and hashtags as ${author} would typically use them.
      Ensure the tweet is a complete thought and doesn't end abruptly or with a cliffhanger.
    `;

    const response = await this.openai.chat.completions.create({
      model: modelId, // Your fine-tuned model ID
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: `Write a tweet about: ${prompt}`,
        },
      ],
      max_tokens: 280,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  };

  listFineTunedModels = async () => {
    const response = await this.openai.models.list();
    console.log("Available Models:", response);
  };

  deleteFineTunedModel = async (modelId) => {
    const response = await this.openai.models.del(modelId);
    console.log("Model deleted:", response.data);
  };
}
