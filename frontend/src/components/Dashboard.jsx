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

    <h2 className="mb-4 fw-bold">
      <i className="bi bi-speedometer2 me-2"></i>
      Dashboard
    </h2>

    <div className="row g-4">

      <div className="col-md-4">
        <div className="card shadow border-0 h-100 bg-primary text-white">
          <div className="card-body text-center">

            <i className="bi bi-file-earmark-person-fill display-5 text-white"></i>

            <h5 className="mt-3 text-white">Total Analyses</h5>

            <h1 className="display-5 fw-bold text-white">
              {dashboard.totalAnalyses}
            </h1>

          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow border-0 h-100 bg-success text-white">
          <div className="card-body text-center">

            <i className="bi bi-speedometer2 display-5 text-white"></i>

            <h5 className="mt-3 text-white">Average Resume Score</h5>

            <h1 className="display-5 fw-bold text-dark">
              {dashboard.averageScore.toFixed(1)}%
            </h1>

          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow border-0 h-100 bg-warning">
          <div className="card-body text-center">

            <i className="bi bi-graph-up-arrow display-5 text-dark"></i>

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