import { Routes, Route, Navigate } from "react-router-dom";
import { Xer } from "./pages/Xer/Xer";
import { BookmarksSummary } from "./pages/BookmarksSummary/BookmarksSummary";
import { NotFound } from "./pages/NotFound";
import { useAppContext } from "./context/app_context/AppContext";
import { Auth } from "./pages/Auth";
import { useApp } from "./hooks/useApp";
import { Loading } from "./components/Loading";
import { AppSidebar } from "./components/sidebar/AppSidebar";

const DEFAULT_ROUTE = "/xer";

const App = () => {
  useApp();

  const {
    appState: {
      user,
      loadingState: { appLoading },
    },
  } = useAppContext();

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
        <Route path="/bookmarks-summary" element={<BookmarksSummary />} />
        <Route path="/xer" element={<Xer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppSidebar>
  );
};

export default App;
