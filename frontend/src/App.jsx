import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import InterviewPage from "./pages/InterviewPage";
import ResumeImproverPage from "./pages/ResumeImproverPage";
import HistoryPage from "./pages/HistoryPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";



function App() {
   useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);
  return (
    <BrowserRouter>

      <Navbar />

      <div className="container mt-4">

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          {/* Resume Analyzer */}
          <Route
            path="/analyze"
            element={<ResumeAnalyzerPage />}
          />

          {/* Interview AI */}
          <Route
            path="/interview"
            element={<InterviewPage />}
          />

          {/* Resume Improver */}
          <Route
            path="/improver"
            element={<ResumeImproverPage />}
          />

          {/* History */}
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