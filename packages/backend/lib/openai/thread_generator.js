import { AgentTrainer } from "./agent_trainer.js";

export class ThreadGenerator extends AgentTrainer {
  constructor() {
    super();
  }

  generateThread = async (threadInstructions, modelId) => {
    const systemResponseConstraints = `
      Return the response as a **pure JSON object**, adhering strictly to the following schema:

        type systemResponse = {
          posts: Post[]
        }

        type Post = {
          text: String
        }

      Example response:
      
      {
        "posts": [
          { "text": "Tweet 1 content here" },
          { "text": "Tweet 2 content here" },
          { "text": "Tweet 3 content here" }
        ]
      }


      ### Output Format Constraints:
       - Return ONLY a valid JSON object. 
       - Do NOT include Markdown formatting (such as \` \`\`\`json \` or \` \`\`\` \`).
       - Do NOT include any extra explanations, comments, or text before or after the JSON.
       - The response should be immediately parsable with JSON.parse(). 
    `;

    const systemMessage = `
      You are an expert in Twitter growth and engagement. 
      Your task is to generate high-quality Twitter threads that are engaging, informative, and concise.

      Follow these custom guidelines given by the user:
        - Thread topic: ${threadInstructions.topic}
        - Thread tone: ${threadInstructions.tone}
        - Thread target audience: ${threadInstructions.targetAudience}
        - Thread length: ${threadInstructions.length} (YOU NEED TO PLAN THE THREAD IN ACCORDANCE TO THIS LENGTH TO MAKE SURE THE CONTENT MAKES SENSE.)

      Follow these general guidelines:

      **Thread Structure & Flow**
        - Begin with a **hook** (first tweet) that grabs attention.
        - Use **short, engaging sentences** for readability.
        - Break information into **bite-sized tweets** (280 characters max).
        - Ensure **each tweet builds on the previous one** to maintain flow.
        - End with a **strong conclusion or Call-to-Action (CTA)**.

      **Content Style & Formatting**
        - Write in a **conversational, engaging, and Twitter-friendly** style.
        - Use **lists and line breaks** where makes sense to improve readability.
        - Use little to no emojis
        - Avoid excessive jargon—**keep it simple and impactful**.

      **Call-to-Action (CTA)**
        - End the thread with a CTA that makes sense given the thread content. For example:
          - A question to encourage engagement.
          - A recommendation to follow the user.
          - A link or resource if provided.

      ${systemResponseConstraints}
    `;

    const userMessage = `${JSON.stringify(threadInstructions)}`;

    const response = await this.openai.chat.completions.create({
      model: modelId || this.chatModel,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    return response.choices[0].message.content
      .trim()
      .replace(/^```json/, "")
      .replace(/```$/, "");
  };
}
