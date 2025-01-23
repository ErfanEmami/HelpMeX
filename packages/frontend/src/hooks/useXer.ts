import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { ASSISTANTS_ENDPOINT, getCreateAssistantEP } from "../lib/endpoints";
import { Assistant, CreateAssistant } from "@/lib/types";

export const useXer = () => {
  const [isLoadingAssistants, setIsLoadingAssistants] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(true);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = useCallback(async () => {
    setIsLoadingAssistants(true);
    setError(null);

    try {
      const { data }: { data: Assistant[] } = await axios.get(ASSISTANTS_ENDPOINT, {
        withCredentials: true,
      });
      setAssistants(data);
    } catch (err) {
      console.error("getBookmarks error:", err);
      setError("Failed to load assistants. Please try again.");
    } finally {
      setIsLoadingAssistants(false);
    }
  }, []);

  const createAssistant = useCallback(async ({username, name}: CreateAssistant) => {
    setIsLoadingCreate(true);
    setError(null);

    try {
      const { data }: { data: Assistant } = await axios.post(
        getCreateAssistantEP(username),
        { name },
        { withCredentials: true }
      );
      setAssistants((prevAssistants) => [...prevAssistants, data]);
    } catch (err) {
      console.error("createAssistant error:", err);
      setError("Failed to create assistant. Please try again.");
    } finally {
      setIsLoadingCreate(false);
    }
  }, []);

  return {
    isLoadingAssistants,
    isLoadingCreate,
    assistants,
    error,
    createAssistant,
  };
};
