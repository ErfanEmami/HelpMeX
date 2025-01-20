import { OpenAIClient } from "./openai";

export class BookmarksAnalyzer extends OpenAIClient {
  constructor() {
    super();
  }

  analyzeBookmarks = async (bookmarks) => {
    const systemResponseConstraints = `
      Return the response as a **pure JSON object**, adhering strictly to the following schema:

        type systemResponse = {
          themes: Theme[]
        }

        type Themes = {
          themeTitle: string,
          keyInsights: string[],
          actionableItems: string[],
          bookmarkRefs: BookmarkID[],  
        }

        Example response: 

        {
          "themes": [
            {
              "themeTitle": "Personal Branding",
              "keyInsights": [
                "Helping established brands can accelerate personal brand growth.",
                "AI tools are creating new opportunities in personal branding."
              ],
              "actionableItems": [
                "Collaborate with larger brands to sell their products.",
                "Leverage AI tools to identify growth strategies."
              ],
              "bookmarkRefs": ["1233", "2534"]
            },
            {
              "themeTitle": "Effective Communication",
              "keyInsights": [
                "Directness improves clarity and decision-making.",
                "Timely communication prevents misunderstandings."
              ],
              "actionableItems": ["Practice direct communication to ensure clarity."],
              "bookmarkRefs": ["4442", "4567"]
            }
          ]
        }

      ### Constraints:
      - Do not include any markdown formatting (e.g., "'''json").
      - Ensure the output is a valid JSON object, I am going to do JSON.parse(yourResponse) so make the response directly parsable.
      - Do not include any extra text outside of the JSON object.
    `

    const systemMessage = `
      You are an expert analyst that creates insightful reports from collections of tweets.
      Your task is to:
      1. Identify major themes and create relevant section titles
      2. Under each section, provide 3-5 key insights in bullet points
      3. Keep insights clear and concise
      4. If there are any actionable items, highlight them
      5. Format the response in markdown with clear sections
      6. For each insight, include the reference number of the source tweet(s) in [ref: X] format

      You will be getting an array of bookmarks as an input.
    
      ${systemResponseConstraints}
    `;

    const userMessage = `${JSON.stringify(bookmarks)}`;

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
      max_tokens: 2000,
    });

    return {
      systemMessage,
      userMessage,
      response,
    };
  };
}
