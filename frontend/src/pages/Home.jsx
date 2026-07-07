import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div>

      {/* ================= HERO ================= */}

      <div
        className="hero-section text-center position-relative overflow-hidden"
        data-aos="fade-up"
      >
        <div className="hero-circle circle1"></div>
        <div className="hero-circle circle2"></div>

        <h1 className="display-2 fw-bold">
          🤖 AI Resume Analyzer
        </h1>

        <p className="lead text-secondary mt-4">
          Analyze your resume, improve ATS score, generate interview
          questions and optimize your resume using Google Gemini AI.
        </p>

        <div className="mt-5">

          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg px-4 me-3"
          >
            🚀 Get Started
          </Link>

          <Link
            to="/analyze"
            className="btn btn-outline-dark btn-lg px-4"
          >
            📄 Analyze Resume
          </Link>

        </div>

      </div>

      {/* ================= FEATURES ================= */}

      <div className="row g-4 mt-5">

        <div className="col-md-4">

          <div
            className="card feature-card shadow border-0 h-100"
            data-aos="zoom-in"
            data-aos-delay="0"
          >

            <div className="card-body text-center p-4">

              <h1 className="mb-3">📄</h1>

              <h4 className="fw-bold">
                Resume Analysis
              </h4>

              <p className="text-muted mt-3">
                Upload your resume and instantly receive ATS score,
                matched skills, missing skills and AI suggestions.
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="card feature-card shadow border-0 h-100"
            data-aos="zoom-in"
            data-aos-delay="150"
          >

            <div className="card-body text-center p-4">

              <h1 className="mb-3">🎯</h1>

              <h4 className="fw-bold">
                Interview AI
              </h4>

              <p className="text-muted mt-3">
                Generate personalized interview questions
                based on your resume and selected job description.
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="card feature-card shadow border-0 h-100"
            data-aos="zoom-in"
            data-aos-delay="300"
          >

            <div className="card-body text-center p-4">

              <h1 className="mb-3">✨</h1>

              <h4 className="fw-bold">
                Resume Improver
              </h4>

              <p className="text-muted mt-3">
                Let Gemini AI rewrite your resume to improve
                ATS compatibility and professional quality.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= WHY CHOOSE ================= */}

      <div
        className="mt-5 p-5 rounded-4 bg-light shadow-sm"
        data-aos="fade-up"
      >

        <h2 className="text-center fw-bold mb-5">
          Why Choose AI Resume Analyzer?
        </h2>

        <div className="row text-center">

          <div className="col-md-3">

            <h1>⚡</h1>

            <h5 className="fw-bold mt-3">
              Fast
            </h5>

            <p className="text-muted">
              Analyze resumes within seconds.
            </p>

          </div>

          <div className="col-md-3">

            <h1>🤖</h1>

            <h5 className="fw-bold mt-3">
              AI Powered
            </h5>

            <p className="text-muted">
              Powered by Google Gemini AI.
            </p>

          </div>

          <div className="col-md-3">

            <h1>📊</h1>

            <h5 className="fw-bold mt-3">
              ATS Friendly
            </h5>

            <p className="text-muted">
              Improve resume compatibility with recruiters.
            </p>

          </div>

          <div className="col-md-3">

            <h1>🎯</h1>

            <h5 className="fw-bold mt-3">
              Placement Ready
            </h5>

            <p className="text-muted">
              Prepare confidently for interviews.
            </p>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <div
        className="text-center mt-5 mb-4 text-muted"
        data-aos="fade-up"
      >

        <hr />

        <p className="mb-0">
          <strong>AI Resume Analyzer</strong> • Built with React,
          Spring Boot, MySQL & Google Gemini AI
        </p>

      </div>

    </div>
  );
}

export default Home;