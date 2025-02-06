import { Routes, Route, Navigate } from "react-router-dom";
import { BookmarksSummary } from "./pages/BookmarksSummary/BookmarksSummary";
import { NotFound } from "./pages/NotFound";
import { useAppContext } from "./context/app_context/AppContext";
import { Auth } from "./pages/Auth";
import { Loading } from "./components/Loading";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { GeneratedSummaries } from "./pages/BookmarksSummary/GeneratedSummaries/GeneratedSummaries";
import { PostScheduler } from "./pages/PostScheduler/PostScheduler";
import { GenerateThread } from "./pages/ContentAssistant/GenerateThread/GenerateThread";
import { GeneratePost } from "./pages/ContentAssistant/GeneratePost/GeneratePost";
import { ContentAssistantLayout } from "./pages/ContentAssistant";
import { BookmarksLayout } from "./pages/BookmarksSummary";
import { PostSchedulerLayout } from "./pages/PostScheduler";

const DEFAULT_ROUTE = "/xer/generate-post";

const App = () => {
  const { getAuthStatus } = useAuth();

  const {
    appState: {
      user,
      loadingState: { appLoading },
    },
  } = useAppContext();

  useEffect(() => {
    getAuthStatus();
  }, []);

  if (appLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex flex-col h-screen">
        <Auth />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/bookmarks-summary" element={<BookmarksLayout />}>
        <Route path="generate-summary" element={<BookmarksSummary />} />
        <Route path="generated-summaries" element={<GeneratedSummaries />} />
      </Route>

      <Route path="/xer" element={<ContentAssistantLayout />}>
        <Route path="generate-post" element={<GeneratePost />} />
        <Route path="generate-thread" element={<GenerateThread />} />
      </Route>

      <Route path="/post-scheduler" element={<PostSchedulerLayout />}>
        <Route path="" element={<PostScheduler />} />
      </Route>
    </Routes>
  );
};

export default App;

