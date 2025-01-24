import axios from "axios";
import { useCallback } from "react";
import {
  ASSISTANTS_ENDPOINT,
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
import { useXerContext } from "@/context/xer_context/XerContext";

export const useAssistants = () => {
  const { xerDispatch } = useXerContext();

  const fetchAssistants = useCallback(async () => {
    xerDispatch({
      type: "SET_LOADING",
      payload: { isLoadingAssistants: true },
    });

    try {
      const { data }: { data: Assistant[] } = await axios.get(
        ASSISTANTS_ENDPOINT,
        {
          withCredentials: true,
        }
      );

      xerDispatch({
        type: "SET_ASSISTANTS",
        payload: data,
      });

      return { assistants: data, error: null };
    } catch (err) {
      console.error("getBookmarks error:", err);
      return { assistants: null, error: "Unable to fetch assistants." };
    } finally {
      xerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingAssistants: false },
      });
    }
  }, []);

  const createAssistant = useCallback(
    async ({ username, name }: CreateAssistant) => {
      xerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingCreateAssistant: true },
      });

      try {
        const { data }: { data: Assistant } = await axios.post(
          getCreateAssistantEP(username),
          { name },
          { withCredentials: true }
        );

        xerDispatch({
          type: "ADD_ASSISTANT",
          payload: data,
        });

        return { assistant: data, error: null };
      } catch (err) {
        console.error("createAssistant error:", err);
        return { assistant: null, error: "Unable to create assistant." };
      } finally {
        xerDispatch({
          type: "SET_LOADING",
          payload: { isLoadingCreateAssistant: false },
        });
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
      return { generatedPost: null, error: "Unable to generate post." };
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
        return { generatedPost: null, error: "Unable to save generated post." };
      }
    },
    []
  );

  return {
    createAssistant,
    fetchAssistants,
    generatePost,
    saveGeneratedPost,
  };
};
