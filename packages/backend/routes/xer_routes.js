import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";
import { USER_POSTS } from "../test/test_data.js";
import { createAgent, getAgentByAuthor, getAgents } from "../models/Agent.js";
import { AgentTrainer } from "../lib/openai/agent_trainer.js";
import { SaveGeneratedPostSchema, GeneratePostSchema } from "shared";
import { createGeneratedPost } from "../models/GeneratedPost.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get all of user's assistants
router.get("/", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const agents = await getAgents(userId);
    res.json(agents);
  } catch (error) {
    console.error("Error getting agent status:", error);
    res.status(500).json({ message: error.message });
  }
});

// create fine-tuned model
router.post("/create/:author", async (req, res) => {
  try {
    const { author } = req.params;
    const { name } = req.body
    const { accessToken, id: userId } = req.user;

    // check if there already is an agent for this author
    const existing = await getAgentByAuthor(userId, author);
    if (existing) {
      return res.status(400).json({ message: `Agent already exists for ${author}` });
    }

    /*** Not making real API call due to rate limits ***/

    // const twitterClient = new TwitterApi(accessToken);

    // // 1. get user ID
    // const user = await twitterClient.v2.userByUsername(author);

    // if (!user || !user.data) {
    //   throw new Error(`X user not found: ${author}`);
    // }

    // // 2: Fetch the user's posts
    // const posts = await twitterClient.v2.userTimeline(user.data.id, {
    //   max_results: 5, // Maximum number of tweets to fetch (up to 100 per request)
    //   "tweet.fields": ["id", "text", "created_at", "public_metrics"], // Include additional fields
    //   exclude: ["retweets", "replies"], // Exclude retweets and replies
    // });

    const posts = USER_POSTS._realData.data.slice(0, 10); // shorten it due to rate limits

    const agentTrainer = new AgentTrainer();

    // create and upload training data
    const jsonlString = agentTrainer.preprocessPostsToJSONL(posts, author);
    const trainingFileId = await agentTrainer.uploadTrainingData(jsonlString);

    // start training process
    const jobId = await agentTrainer.createFineTune(trainingFileId);

    const agent = await createAgent({
      jobId,
      trainingFileId,
      userId,
      author,
      name,
    });

    res.json(agent);
  } catch (error) {
    console.error("Error creating agent:", error);
    res.status(500).json({ message: error.message });
  }
});

// get agent training status
router.get("/create/:author/status", async (req, res) => {
  try {
    const { author } = req.params;
    const { id: userId } = req.user;

    // check if there already is an agent for this author
    const existing = await getAgentByAuthor(userId, author);
    if (!existing) {
      return res.status(400).json({ message: `Agent doesn't exist for ${author}` });
    }

    const { jobId } = await getAgentByAuthor(userId, author);

    const agentTrainer = new AgentTrainer();
    const { status } = await agentTrainer.getFineTunedState(jobId);

    res.json(status);
  } catch (error) {
    console.error("Error getting agent status:", error);
    res.status(500).json({ message: error.message });
  }
});

// generate post
router.post("/:author/generate-post", async (req, res) => {
  try {
    const { author } = req.params;
    const { id: userId } = req.user;
    const { prompt } = req.body

    // Validate the input using Zod
    const validationResult = GeneratePostSchema.safeParse({ author, prompt });
    
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validationResult.error.errors,
      });
    }

    const { author: validatedAuthor, prompt: validatedPrompt } = validationResult.data;

    // check if there already is an agent for this author
    const agent = await getAgentByAuthor(userId, validatedAuthor);
    if (!agent) {
      return res
        .status(400)
        .json({ message: `Agent doesn't exist for ${author}` });
    }

    const agentTrainer = new AgentTrainer();

    // check fine-tune status
    const ftState = await agentTrainer.getFineTunedState(agent.jobId);

    if (ftState.status !== "succeeded") {
      return res.status(400).json({ message: `Fine-tuned Model is not ready.` });
    }

    const resp = await agentTrainer.promptFineTunedModel(
      ftState.fine_tuned_model,
      validatedPrompt,
    );

    res.json(resp.choices[0].text);
  } catch (error) {
    console.error("Error getting agent status:", error);
    res.status(500).json({ message: error.message });
  }
});

// store post
router.post("/:author/generate-post/save", async (req, res) => {
  try {
    const { author } = req.params;
    const { id: userId } = req.user;

    // Validate the input using Zod
    const validationResult = SaveGeneratedPostSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validationResult.error.errors,
      });
    }

    const validatedGeneratedPost = validationResult.data;

    // check if there already is an agent for this author
    const agent = await getAgentByAuthor(userId, validatedGeneratedPost.author);
    if (!agent) {
      return res
        .status(400)
        .json({ message: `Agent doesn't exist for ${author}` });
    }

    const generatedPost = await createGeneratedPost(validatedGeneratedPost);

    res.json(generatedPost);
  } catch (error) {
    console.error("Error getting agent status:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;


// TODO: add middleware for checking if agent for author exists