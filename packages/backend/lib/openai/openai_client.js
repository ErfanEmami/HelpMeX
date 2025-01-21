import { OpenAI } from "openai";

export class OpenAIClient {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.chatModel = "gpt-3.5-turbo-1106";
  }
}
