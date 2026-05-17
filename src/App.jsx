import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlanceMailPrivacy from './pages/GlanceMailPrivacy';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/glanceMail.html" element={<GlanceMailPrivacy />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
