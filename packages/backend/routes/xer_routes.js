import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";
import { GPT_RESPONSE_GENERATED_THREAD, USER_POSTS } from "../test/test_data.js";
import { createAgent, getAgentByAuthor, getAgents } from "../models/Agent.js";
import { AgentTrainer } from "../lib/openai/agent_trainer.js";
import { SaveGeneratedPostSchema, GeneratePostSchema, GeneratedPostSchema, GeneratedPostsSchema, agentSchema, agentsSchema, ThreadConstraintsSchema, GeneratedThreadSchema, SaveGeneratedThreadSchema, SavedGeneratedThreadSchema, SavedGeneratedThreadsSchema } from "shared";
import { createGeneratedPost, getGeneratedPosts } from "../models/GeneratedPost.js";
import { validateResponse } from "../lib/utils.js";
import { z } from "zod";
import { ThreadGenerator } from "../lib/openai/thread_generator.js";
import { createGeneratedThread, getGeneratedThreads } from "../models/GeneratedThread.js";

const textSchema = z.string()

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get all of user's assistants
router.get("/", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const agents = await getAgents(userId);

    // validate response
    const validatedRes = validateResponse(agentsSchema, agents)
    
    res.json(validatedRes);    
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

    // validate response
    const validatedRes = validateResponse(agentSchema, agent)
    
    res.json(validatedRes);
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

    // validate response
    const validatedRes = validateResponse(textSchema, status)
    
    res.json(validatedRes);
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
    const validatedInput = GeneratePostSchema.safeParse({ author, prompt });
    
    if (!validatedInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validatedInput.error.errors,
      });
    }

    const { author: validatedAuthor, prompt: validatedPrompt } = validatedInput.data;

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

    const generatedText = await agentTrainer.promptFineTunedModel(
      ftState.fine_tuned_model,
      validatedPrompt,
      author,
    );

    // validate response
    const validatedRes = validateResponse(textSchema, generatedText)
    
    res.json(validatedRes);
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
    const validatedInput = SaveGeneratedPostSchema.safeParse(req.body);
    
    if (!validatedInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validatedInput.error.errors,
      });
    }

    const validatedGeneratedPost = validatedInput.data;

    // check if there already is an agent for this author
    const agent = await getAgentByAuthor(userId, validatedGeneratedPost.author);
    if (!agent) {
      return res
        .status(400)
        .json({ message: `Agent doesn't exist for ${author}` });
    }

    const generatedPost = await createGeneratedPost(validatedGeneratedPost);

    // validate response
    const validatedRes = validateResponse(GeneratedPostSchema, generatedPost)
    
    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting agent status:", error);
    res.status(500).json({ message: error.message });
  }
});

// get all of generated posts created by assistant
router.get("/:author/generate-post/all", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { author } = req.params;
    const generatedPosts = await getGeneratedPosts(userId, author);

    // validate response
    const validatedRes = validateResponse(GeneratedPostsSchema, generatedPosts)
    
    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting agent status:", error);
    res.status(500).json({ message: error.message });
  }
});

// generate thread
router.post("/:author/generate-thread", async (req, res) => {
  try {
    const { author } = req.params;
    const { id: userId } = req.user;

    // Validate the input using Zod
    const validatedInput = ThreadConstraintsSchema.safeParse(req.body);
    
    if (!validatedInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validatedInput.error.errors,
      });
    }

    const validatedThreadConstraints = validatedInput.data;

    // check if there already is an agent for this author
    const agent = await getAgentByAuthor(userId, author);
    if (!agent) {
      return res
        .status(400)
        .json({ message: `Agent doesn't exist for ${author}` });
    }

    const threadGenerator = new ThreadGenerator();

    // check fine-tune status
    const ftState = await threadGenerator.getFineTunedState(agent.jobId);

    if (ftState.status !== "succeeded") {
      return res.status(400).json({ message: `Fine-tuned Model is not ready.` });
    }

    const gptResponse = await threadGenerator.generateThread(
      validatedThreadConstraints,
      ftState.fine_tuned_model,
    );

    // validate GPT response
    // TODO: if validation failed, try again for x number of times
    const validatedRes = validateResponse(GeneratedThreadSchema, JSON.parse(gptResponse))
    
    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting agent status:", error);
    res.status(500).json({ message: error.message });
  }
});

// store thread
router.post("/:author/generate-thread/save", async (req, res) => {
  try {
    const { author } = req.params;
    const { id: userId } = req.user;

    // Validate the input using Zod
    const validatedInput = SaveGeneratedThreadSchema.safeParse(req.body);
    
    if (!validatedInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validatedInput.error.errors,
      });
    }

    const validatedGeneratedThread = validatedInput.data;

    // check if there already is an agent for this author
    const agent = await getAgentByAuthor(userId, validatedGeneratedThread.author);
    if (!agent) {
      return res
        .status(400)
        .json({ message: `Agent doesn't exist for ${author}` });
    }

    const generatedThread = await createGeneratedThread({
      ...validatedGeneratedThread,
      userId: userId,
      jobId: agent.jobId,
    });

    // validate response
    const validatedRes = validateResponse(SavedGeneratedThreadSchema, generatedThread)
    
    res.json(validatedRes);
  } catch (error) {
    console.error("Error saving thread:", error);
    res.status(500).json({ message: error.message });
  }
});

// get all of generated threads created by assistant
router.get("/:author/generate-thread/all", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { author } = req.params;
    const generatedThreads = await getGeneratedThreads(userId, author);

    // validate response
    const validatedRes = validateResponse(SavedGeneratedThreadsSchema, generatedThreads)
    
    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting threads:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;


// TODO: add middleware for checking if agent for author exists