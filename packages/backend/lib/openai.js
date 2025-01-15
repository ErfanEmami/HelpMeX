import { OpenAI } from "openai";

export class GPTClient {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  analyzeBookmarks = async (bookmarks) => {
    const systemMessage = `You are an expert analyst that creates insightful reports from collections of tweets.
                           Your task is to:
                           1. Identify major themes and create relevant section titles
                           2. Under each section, provide 3-5 key insights in bullet points
                           3. Keep insights clear and concise
                           4. If there are any actionable items, highlight them
                           5. Format the response in markdown with clear sections
                           6. For each insight, include the reference number of the source tweet(s) in [ref: X] format
                           
                           Example format:
                           # Theme One
                           - Key insight about something [ref: 1]
                           - Another insight derived from multiple tweets [ref: 2,4]
                           
                           Focus on extracting practical, valuable insights while maintaining high analytical quality.`;

    const userMessage = `Please analyze these bookmarked tweets and create a structured report:\n\n${JSON.stringify(bookmarks)}`;

    const response = await this.openai.chat.completions.create({
      // Using GPT-3.5-turbo for better cost efficiency while maintaining quality
      model: "gpt-3.5-turbo-1106",
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
      temperature: 0.3, // Lower temperature for more consistent outputs
      max_tokens: 1000,
    });

    return {
      systemMessage,
      userMessage,
      response,
    };
  };
}
