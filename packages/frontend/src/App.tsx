import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Summary } from "./pages/Summary";
import { NotFound } from "./pages/NotFound";

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
