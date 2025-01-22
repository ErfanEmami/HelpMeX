import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { ASSISTANTS_ENDPOINT } from "../lib/endpoints";
import { Assistant } from "@/lib/types";

export const useXer = () => {
  const [isLoadingAssistants, setIsLoadingAssistants] = useState<boolean>(true);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchAssistants();
  }, [fetchAssistants]);

  return {
    isLoadingAssistants,
    assistants,
    error,
  };
};
