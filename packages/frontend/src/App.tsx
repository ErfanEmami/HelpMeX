import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Summary } from './pages/summary';
import { NotFound } from './pages/not_found';

const App = () => {
  return (
    <div>
      <nav>
        <a href="/">Home</a> | <a href="/summary">Summary</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Summary" element={<Summary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
