import { Routes, Route, Navigate } from "react-router-dom";
import { HelpMeX } from "./pages/HelpMeX";
import { BookmarksSummary } from "./pages/BookmarksSummary";
import { NotFound } from "./pages/NotFound";
import { useAppContext } from "./context/app_context/AppContext";
import { Auth } from "./pages/Auth";
import { useApp } from "./hooks/useApp";
import { Loading } from "./components/Loading";
import { AppSidebar } from "./components/sidebar/AppSidebar";

const DEFAULT_ROUTE = "/bookmarks-summary"

const App = () => {
  useApp();

  const {
    appState: {
      user,
      loadingState: { appLoading },
    },
  } = useAppContext();

  if (!user) {
    return <Auth />;
  }

  if (appLoading) {
    return <Loading />;
  }

  return (
    <AppSidebar>
      <div className="w-full h-screen flex flex-col">
        <div className={`flex-grow m-auto w-full max-w-[1400px]`}>
          <Routes>
            <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
            <Route path="/bookmarks-summary" element={<BookmarksSummary />} />
            <Route path="/help-me-x" element={<HelpMeX />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AppSidebar>
  );
};

export default App;
