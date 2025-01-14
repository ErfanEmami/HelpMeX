// meant to be called only once in App.tsx

import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useApp = () => {
  const { getAuthStatus } = useAuth();

  useEffect(() => {
    getAuthStatus();
  }, []);
};
