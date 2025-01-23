import axios from "axios";
import { useCallback } from "react";
import { ASSISTANTS_ENDPOINT, getCreateAssistantEP } from "../lib/endpoints";
import { Assistant, CreateAssistant } from "@/lib/types";
import { useXerContext } from "@/context/xer_context/XerContext";

export const useXer = () => {
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

  return {
    createAssistant,
    fetchAssistants,
  };
};
