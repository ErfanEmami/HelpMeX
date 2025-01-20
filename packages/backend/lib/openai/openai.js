import { OpenAI } from "openai";

export class OpenAIClient {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
}
