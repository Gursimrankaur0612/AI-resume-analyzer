import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import DashboardPage from "./pages/DashboardPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import InterviewPage from "./pages/InterviewPage";
import ResumeImproverPage from "./pages/ResumeImproverPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className="container mt-4">

        <Routes>

          <Route path="/" element={<DashboardPage />} />

          <Route
            path="/analyze"
            element={<ResumeAnalyzerPage />}
          />

          <Route
            path="/interview"
            element={<InterviewPage />}
          />

          <Route
            path="/improver"
            element={<ResumeImproverPage />}
          />

          <Route
            path="/history"
            element={<HistoryPage />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;