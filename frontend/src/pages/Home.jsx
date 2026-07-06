import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Hero Section */}

      <div className="text-center py-5">

        <h1 className="display-3 fw-bold">
          🤖 AI Resume Analyzer
        </h1>

        <p className="lead text-muted mt-3">
          Analyze your resume, improve ATS score, generate interview
          questions and optimize your resume using Google Gemini AI.
        </p>

        <div className="mt-4">

          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg me-3"
          >
            🚀 Get Started
          </Link>

          <Link
            to="/analyze"
            className="btn btn-outline-dark btn-lg"
          >
            📄 Analyze Resume
          </Link>

        </div>

      </div>

      {/* Feature Cards */}

      <div className="row g-4 mt-3">

        <div className="col-md-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body text-center">

              <h1>📄</h1>

              <h4>Resume Analysis</h4>

              <p className="text-muted">
                Upload your resume and receive ATS score,
                missing skills, matched skills and AI suggestions.
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body text-center">

              <h1>🎯</h1>

              <h4>Interview AI</h4>

              <p className="text-muted">
                Generate personalized interview questions
                based on your resume and selected job.
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body text-center">

              <h1>✨</h1>

              <h4>Resume Improver</h4>

              <p className="text-muted">
                Let Gemini AI rewrite your resume
                to maximize ATS score and readability.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Why Choose */}

      <div className="mt-5 p-5 rounded bg-light">

        <h2 className="text-center mb-4">
          Why Choose AI Resume Analyzer?
        </h2>

        <div className="row text-center">

          <div className="col-md-3">
            <h1>⚡</h1>
            <h5>Fast</h5>
            <p>Analyze resumes within seconds.</p>
          </div>

          <div className="col-md-3">
            <h1>🤖</h1>
            <h5>AI Powered</h5>
            <p>Powered by Google Gemini AI.</p>
          </div>

          <div className="col-md-3">
            <h1>📊</h1>
            <h5>ATS Friendly</h5>
            <p>Improve resume compatibility.</p>
          </div>

          <div className="col-md-3">
            <h1>🎯</h1>
            <h5>Placement Ready</h5>
            <p>Prepare confidently for interviews.</p>
          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="text-center mt-5 mb-4 text-muted">

        <hr />

        <p>
          AI Resume Analyzer • Built with React, Spring Boot,
          MySQL & Google Gemini AI
        </p>

      </div>

    </div>
  );
}

export default Home;