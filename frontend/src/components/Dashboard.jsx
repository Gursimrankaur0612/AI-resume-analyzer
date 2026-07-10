import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/resume/dashboard")
      .then((response) => setDashboard(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (!dashboard) {
    return <h4>Loading Dashboard...</h4>;
  }

return (
  <div>

    <div className="mb-5">

  <h1 className="fw-bold">
    📊 Dashboard
  </h1>

  <p className="text-muted fs-5">
    Welcome to your AI Resume Analyzer dashboard.
    Monitor your resume analyses, ATS performance and AI insights.
  </p>

</div>

    <div className="row g-4">

      <div className="col-md-4">
        <div className="card dashboard-card shadow bg-primary text-white h-100">
          <div className="card-body text-center">

           <div className="dashboard-icon">
    <i className="bi bi-file-earmark-person-fill display-5"></i>
</div>

            <h5 className="mt-3 text-white">Total Analyses</h5>

            <h1 className="display-5 fw-bold text-white">
              {dashboard.totalAnalyses}
            </h1>

          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card dashboard-card shadow bg-success text-white h-100">
          <div className="card-body text-center">

            <div className="dashboard-icon">
    <i className="bi bi-speedometer2 display-5"></i>
</div>

            <h5 className="mt-3 text-white">Average Resume Score</h5>

            <h1 className="display-5 fw-bold text-dark">
              {dashboard.averageScore.toFixed(1)}%
            </h1>

          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card dashboard-card shadow bg-warning h-100">
          <div className="card-body text-center">

            <div className="dashboard-icon">
    <i className="bi bi-graph-up-arrow display-5"></i>
</div>

            <h5 className="mt-3 text-dark">Average ATS Match</h5>

            <h1 className="display-5 fw-bold text-dark">
              {dashboard.averageAtsMatch.toFixed(1)}%
            </h1>

          </div>
        </div>
      </div>

    </div>

  </div>
);
}

export default Dashboard;