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
          content: `You are a helpful assistant who writes posts in the style of ${author}.`,
        },
        { role: "user", content: `Write a post in the style of ${author}.` },
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

    try {
      await fs.writeFile(tempFilePath, jsonlString);
      const stream = createReadStream(tempFilePath);

      const response = await this.openai.files.create({
        purpose: "fine-tune",
        file: stream,
      });

      return response.id;
    } catch (error) {
      throw error; // propagate error to caller
    } finally {
      // Clean up the temporary file
      try {
        await fs.unlink(tempFilePath); // delete temp file
      } catch (cleanupError) {
        console.error(
          "Error cleaning up temporary file:",
          cleanupError.message
        );
      }
    }
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
  promptFineTunedModel = async (modelId, prompt) => {
    const response = await this.openai.completions.create({
      model: modelId, // fine-tuned model ID
      prompt: prompt,
      max_tokens: 280, // Ensure tweet-length outputs
      temperature: 0.7, // Adjust for creativity
    });

    return response;
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
