import axios from "axios";
import { useCallback } from "react";
import {
  ASSISTANTS_ENDPOINT,
  generatedPostsEP,
  generatePostEP,
  getCreateAssistantEP,
  saveGeneratedPostEP,
} from "../lib/endpoints";
import {
  Assistant,
  CreateAssistant,
  SaveGeneratedPost,
  GeneratePost,
  GeneratedPost,
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

  return {
    createAssistant,
    fetchAssistants,
    generatePost,
    saveGeneratedPost,
    fetchGeneratedPosts,
  };
};
