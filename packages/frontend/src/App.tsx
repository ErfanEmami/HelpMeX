import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { Summary } from "./pages/Summary";
import { NotFound } from "./pages/NotFound";
import { useAppContext } from "./context/app_context/AppContext";
import { Auth } from "./pages/Auth";
import { useApp } from "./hooks/useApp";
import { Loading } from "./components/Loading";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

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

  return (
    <div className="w-full h-screen flex flex-col">
      <nav className="border-b">
        <div className={`p-4 m-auto max-w-[1400px]`}>
          <a href="/">Home</a> | <a href="/summary">Summary</a>
        </div>
      </nav>
      <div className={`flex-grow m-auto w-full max-w-[1400px]`}>
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
