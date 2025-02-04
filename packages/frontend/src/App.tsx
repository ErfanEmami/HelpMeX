import { Routes, Route, Navigate } from "react-router-dom";
import { BookmarksSummary } from "./pages/BookmarksSummary/BookmarksSummary";
import { NotFound } from "./pages/NotFound";
import { useAppContext } from "./context/app_context/AppContext";
import { Auth } from "./pages/Auth";
import { Loading } from "./components/Loading";
import { AppSidebar } from "./components/sidebar/AppSidebar";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { GeneratedSummaries } from "./pages/BookmarksSummary/GeneratedSummaries/GeneratedSummaries";
import { PostScheduler } from "./pages/PostScheduler/PostScheduler";
import { GenerateThread } from "./pages/Xer/GenerateThread/GenerateThread";
import { GeneratePost } from "./pages/Xer/GeneratePost/GeneratePost";

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
    <AppSidebar>
      <Routes>
        <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/bookmarks-summary">
          <Route path="generate-summary" element={<BookmarksSummary />} />
          <Route path="generated-summaries" element={<GeneratedSummaries />} />
        </Route>

        <Route path="/xer">
          <Route path="generate-post" element={<GeneratePost />} />
          <Route path="generate-thread" element={<GenerateThread />} />
        </Route>

        <Route path="/post-scheduler">
          <Route path="" element={<PostScheduler />} />
        </Route>
      </Routes>
    </AppSidebar>
  );
};

export default App;
