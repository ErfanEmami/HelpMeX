import { useAppContext } from "./AppContext";

export const useDispatchHelpers = () => {
  const { appDispatch } = useAppContext();

  const setAppError = (
    error: {
      onCancel?: () => void;
      onRetry?: () => void;
      text: string;
    } | null
  ) => {
    const clearError = () => appDispatch({ type: "SET_ERROR", payload: null });

    if (!error) {
      clearError();
    } else {
      appDispatch({
        type: "SET_ERROR",
        payload: {
          error: error.text,
          onCancel: {
            text: "Cancel",
            onClick: () => {
              clearError();
              error.onCancel?.();
            },
          },
          onAccept: {
            text: "Try Again",
            onClick: () => {
              clearError();
              error.onRetry?.();
            },
          },
        },
      });
    }
  };

  return {
    setAppError,
  };
};
