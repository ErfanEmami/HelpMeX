import axios from "axios";
import { useCallback } from "react";
import {
  ASSISTANTS_ENDPOINT,
  generatedPostsEP,
  generatedThreadsEP,
  generatePostEP,
  generateThreadEP,
  getCreateAssistantEP,
  saveGeneratedPostEP,
  saveGeneratedThreadEP,
} from "../lib/endpoints";
import {
  Assistant,
  CreateAssistant,
  SaveGeneratedPost,
  GeneratePost,
  GeneratedPost,
  ThreadConstraints,
  GeneratedThread,
  SaveGeneratedThread,
  SavedGeneratedThread,
} from "@/lib/types";

export const useAssistants = () => {
  const fetchAssistants = useCallback(async () => {
    try {
      const { data }: { data: Assistant[] } = await axios.get(
        ASSISTANTS_ENDPOINT,
        { withCredentials: true }
      );

      return { assistants: data, error: null };
    } catch (err) {
      console.error("getBookmarks error:", err);
      return {
        assistants: null,
        error: "Unable to fetch assistants.",
      };
    }
  }, []);

  const createAssistant = useCallback(
    async ({ username, name }: CreateAssistant) => {
      try {
        const { data }: { data: Assistant } = await axios.post(
          getCreateAssistantEP(username),
          { name },
          { withCredentials: true }
        );

        return { assistant: data, error: null };
      } catch (err) {
        console.error("createAssistant error:", err);
        return {
          assistant: null,
          error: "Unable to create assistant.",
        };
      }
    },
    []
  );

  const generatePost = useCallback(async ({ author, prompt }: GeneratePost) => {
    try {
      const { data }: { data: string } = await axios.post(
        generatePostEP(author),
        { author, prompt },
        { withCredentials: true }
      );

      return { generatedPost: data, error: null };
    } catch (err) {
      console.error("generatePost error:", err);
      return {
        generatedPost: null,
        error: "Unable to generate post.",
      };
    }
  }, []);

  const saveGeneratedPost = useCallback(
    async (generatedPost: SaveGeneratedPost) => {
      try {
        const { data }: { data: GeneratedPost } = await axios.post(
          saveGeneratedPostEP(generatedPost.author),
          generatedPost,
          { withCredentials: true }
        );

        return { generatedPost: data, error: null };
      } catch (err) {
        console.error("saveGeneratedPost error:", err);
        return {
          generatedPost: null,
          error: "Unable to save generated post.",
        };
      }
    },
    []
  );

  const fetchGeneratedPosts = useCallback(async (author: string) => {
    try {
      const { data }: { data: GeneratedPost[] } = await axios.get(
        generatedPostsEP(author),
        { withCredentials: true }
      );

      return { generatedPosts: data, error: null };
    } catch (err) {
      console.error("fetchGeneratedPosts error:", err);
      return {
        generatedPosts: null,
        error: "Unable to fetch generated posts.",
      };
    }
  }, []);

  // generate thread with AI
  const generateThread = useCallback(
    async (author: string, constraints: ThreadConstraints) => {
      try {
        const { data }: { data: GeneratedThread } = await axios.post(
          generateThreadEP(author),
          constraints,
          { withCredentials: true }
        );

        return { generatedThread: data, error: null };
      } catch (err) {
        console.error("generateThread error:", err);
        return {
          generatedThread: null,
          error: "Unable to generate thread.",
        };
      }
    },
    []
  );

  const saveGeneratedThread = useCallback(
    async (generatedThread: SaveGeneratedThread) => {
      try {
        const { data }: { data: SavedGeneratedThread } = await axios.post(
          saveGeneratedThreadEP(generatedThread.author),
          generatedThread,
          { withCredentials: true }
        );

        return { generatedThread: data, error: null };
      } catch (err) {
        console.error("saveGeneratedThread error:", err);
        return {
          generatedThread: null,
          error: "Unable to save generated thread.",
        };
      }
    },
    []
  );

  const fetchGeneratedThreads = useCallback(async (author: string) => {
    try {
      const { data }: { data: SavedGeneratedThread[] } = await axios.get(
        generatedThreadsEP(author),
        { withCredentials: true }
      );

      return { generatedThreads: data, error: null };
    } catch (err) {
      console.error("fetchGeneratedThreads error:", err);
      return {
        generatedThreads: null,
        error: "Unable to fetch generated threads.",
      };
    }
  }, []);

  return {
    createAssistant,
    fetchAssistants,

    generatePost,
    saveGeneratedPost,
    fetchGeneratedPosts,

    generateThread,
    saveGeneratedThread,
    fetchGeneratedThreads,
  };
};
