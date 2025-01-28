import { SUMMARIES_ENDPOINT } from "@/lib/endpoints";
import { SavedSummary } from "@/lib/types";
import axios from "axios";
import { useCallback } from "react";

export const useSummaries = () => {
  const fetchSummaries = useCallback(async () => {
    try {
      const { data }: { data: SavedSummary[] } = await axios.get(
        SUMMARIES_ENDPOINT,
        { withCredentials: true }
      );

      return { summaries: data, error: null };
    } catch (err) {
      console.error("fetchSummaries error:", err);
      return {
        summaries: null,
        error: "Unable to fetch summaries.",
      };
    }
  }, []);

  return {
    fetchSummaries,
  };
};
