import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Summary } from "./pages/summary";
import { NotFound } from "./pages/not_found";

const MAX_WIDTH = "1400px";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav className="p-4 border-b">
        <div className={`m-auto max-w-[${MAX_WIDTH}]`}>
          <a href="/">Home</a> | <a href="/summary">Summary</a>
        </div>
      </nav>
      <div className={`flex-grow m-auto w-full max-w-[${MAX_WIDTH}]`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
