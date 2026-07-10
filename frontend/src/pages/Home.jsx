import { Link } from "react-router-dom";
import "../styles/home.css";
import CountUp from "react-countup";

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
  <i className="bi bi-robot text-primary me-3"></i>
  AI Resume Analyzer
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
      {/* ================= STATS ================= */}

<div
  className="row text-center my-5"
  data-aos="fade-up"
>

  <div className="col-md-3">

    <div className="stat-card">

      <h2>1000+</h2>

      <p>Resumes Analyzed</p>

    </div>

  </div>

  <div className="col-md-3">

    <div className="stat-card">

      <h2>95%</h2>

      <p>ATS Accuracy</p>

    </div>

  </div>

  <div className="col-md-3">

    <div className="stat-card">

      <h2>24/7</h2>

      <p>AI Assistance</p>

    </div>

  </div>

  <div className="col-md-3">

    <div className="stat-card">

      <h2>Gemini</h2>

      <p>Powered AI</p>

    </div>

  </div>

</div>
{/* ================= HOW IT WORKS ================= */}

<div
  className="mt-5"
  data-aos="fade-up"
>

  <h2 className="text-center fw-bold mb-5">
    How It Works
  </h2>

  <div className="row text-center">

    <div className="col-md-2">

      <div className="process-card">

        <i className="bi bi-upload display-4 text-primary"></i>

        <h5 className="mt-3">
          Upload Resume
        </h5>

      </div>

    </div>

    <div className="col-md-1 d-flex align-items-center justify-content-center">

      <i className="bi bi-arrow-right display-6 text-secondary"></i>

    </div>

    <div className="col-md-2">

      <div className="process-card">

        <i className="bi bi-robot display-4 text-success"></i>

        <h5 className="mt-3">
          Gemini AI
        </h5>

      </div>

    </div>

    <div className="col-md-1 d-flex align-items-center justify-content-center">

      <i className="bi bi-arrow-right display-6 text-secondary"></i>

    </div>

    <div className="col-md-2">

      <div className="process-card">

        <i className="bi bi-bar-chart-fill display-4 text-warning"></i>

        <h5 className="mt-3">
          ATS Analysis
        </h5>

      </div>

    </div>

    <div className="col-md-1 d-flex align-items-center justify-content-center">

      <i className="bi bi-arrow-right display-6 text-secondary"></i>

    </div>

    <div className="col-md-2">

      <div className="process-card">

        <i className="bi bi-person-workspace display-4 text-danger"></i>

        <h5 className="mt-3">
          Interview Prep
        </h5>

      </div>

    </div>

  </div>

</div>
{/* ================= TECH STACK ================= */}

<div
  className="mt-5"
  data-aos="fade-up"
>

  <h2 className="text-center fw-bold mb-5">
    Built With
  </h2>

  <div className="row text-center g-4">

    <div className="col-md-2 col-6">

      <div className="tech-card">

        <i className="bi bi-filetype-java display-3 text-danger"></i>

        <h6 className="mt-3">Java</h6>

      </div>

    </div>

    <div className="col-md-2 col-6">

      <div className="tech-card">

        <i className="bi bi-server display-3 text-success"></i>

        <h6 className="mt-3">Spring Boot</h6>

      </div>

    </div>

    <div className="col-md-2 col-6">

      <div className="tech-card">

        <i className="bi bi-database-fill display-3 text-primary"></i>

        <h6 className="mt-3">MySQL</h6>

      </div>

    </div>

    <div className="col-md-2 col-6">

      <div className="tech-card">

        <i className="bi bi-google display-3 text-warning"></i>

        <h6 className="mt-3">Gemini AI</h6>

      </div>

    </div>

    <div className="col-md-2 col-6">

      <div className="tech-card">

        <i className="bi bi-bootstrap-fill display-3 text-purple"></i>

        <h6 className="mt-3">Bootstrap</h6>

      </div>

    </div>

    <div className="col-md-2 col-6">

      <div className="tech-card">

        <i className="bi bi-filetype-jsx display-3 text-info"></i>

        <h6 className="mt-3">React</h6>

      </div>

    </div>

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

              <i className="bi bi-file-earmark-text-fill display-3 text-primary"></i>

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

              <i className="bi bi-person-workspace display-3 text-success"></i>

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

              <i className="bi bi-stars display-3 text-warning"></i>

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

            <i className="bi bi-lightning-charge-fill display-3 text-warning"></i>

            <h5 className="fw-bold mt-3">
              Fast
            </h5>

            <p className="text-muted">
              Analyze resumes within seconds.
            </p>

          </div>

          <div className="col-md-3">

           <i className="bi bi-cpu-fill display-3 text-primary"></i>

            <h5 className="fw-bold mt-3">
              AI Powered
            </h5>

            <p className="text-muted">
              Powered by Google Gemini AI.
            </p>

          </div>

          <div className="col-md-3">

            <i className="bi bi-bar-chart-fill display-3 text-success"></i>

            <h5 className="fw-bold mt-3">
              ATS Friendly
            </h5>

            <p className="text-muted">
              Improve resume compatibility with recruiters.
            </p>

          </div>

          <div className="col-md-3">

            <i className="bi bi-bullseye display-3 text-danger"></i>

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