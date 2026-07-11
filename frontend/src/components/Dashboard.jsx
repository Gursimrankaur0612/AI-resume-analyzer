import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/resume/dashboard")
      .then((response) => setDashboard(response.data))
      .catch((error) => console.error(error));
      axios
  .get("http://localhost:8080/resume/history")
  .then((response) => {

    const latest = response.data
      .sort(
        (a, b) =>
          new Date(b.analyzedAt) -
          new Date(a.analyzedAt)
      )
      .slice(0, 5);

    setHistory(latest);

  })
  .catch((error) => console.error(error));
  }, []);

  if (!dashboard) {
    return <h4>Loading Dashboard...</h4>;
  }

return (
  <div>

    <div className="mb-5">

    <h1 className="display-5 fw-bold">
        Dashboard
    </h1>

    <p className="text-muted fs-5">
        Welcome back! Here's an overview of your resume analytics,
        ATS performance, and AI-powered insights.
    </p>

    <hr />

</div>

    <div className="row g-4">

      <div className="col-lg-3 col-md-6">
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

      <div className="col-lg-3 col-md-6">
        <div className="card dashboard-card shadow bg-success text-white h-100">
          <div className="card-body text-center">

            <div className="dashboard-icon">
    <i className="bi bi-speedometer2 display-5"></i>
</div>

            <h5 className="mt-3 text-white">Average Resume Score</h5>

            <h1 className="display-5 fw-bold text-dark">
  {dashboard.averageScore.toFixed(1)}%
</h1>

<div className="progress mt-3" style={{ height: "10px" }}>

  <div
    className="progress-bar bg-light"
    role="progressbar"
    style={{
      width: `${dashboard.averageScore}%`,
    }}
  ></div>

</div>

          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="card dashboard-card shadow bg-warning h-100">
          <div className="card-body text-center">

            <div className="dashboard-icon">
    <i className="bi bi-graph-up-arrow display-5"></i>
</div>

            <h5 className="mt-3 text-dark">Average ATS Match</h5>

           <h1 className="display-5 fw-bold text-dark">
  {dashboard.averageAtsMatch.toFixed(1)}%
</h1>

<div className="progress mt-3" style={{ height: "10px" }}>

  <div
    className="progress-bar bg-dark"
    role="progressbar"
    style={{
      width: `${dashboard.averageAtsMatch}%`,
    }}
  ></div>

</div>

          </div>
        </div>
      </div>

    <div className="col-lg-3 col-md-6">
  <div className="card dashboard-card shadow bg-info text-white h-100">
    <div className="card-body text-center">

      <div className="dashboard-icon">
        <i className="bi bi-lightbulb-fill display-5"></i>
      </div>

      <h5 className="mt-3 text-white">
        Top Skill
      </h5>

      <h1 className="display-6 fw-bold text-white">
        Spring Boot
      </h1>

    </div>
  </div>
</div>

</div>
<div className="card shadow-sm border-0 mt-5">

  <div className="card-body">

    <h3 className="fw-bold mb-4">
      Recent Analyses
    </h3>

    <table className="table table-hover align-middle table-bordered">

      <thead>
        <tr>
          <th>Job</th>
          <th>Score</th>
          <th>ATS</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>

        {history.map((item) => (

          <tr key={item.id}>

            <td>
  <span className="badge rounded-pill bg-primary px-3 py-2">
    {item.jobTitle || "General"}
  </span>
</td>

           <td>
  <span
    className={`badge rounded-pill ${
      item.score >= 80
        ? "bg-success"
        : item.score >= 60
        ? "bg-warning text-dark"
        : "bg-danger"
    }`}
  >
    {item.score}%
  </span>
</td>

            <td>
  <span
    className={`badge rounded-pill ${
      item.atsMatch >= 80
        ? "bg-success"
        : item.atsMatch >= 60
        ? "bg-warning text-dark"
        : "bg-danger"
    }`}
  >
    {item.atsMatch}%
  </span>
</td>

            <td>
              {new Date(item.analyzedAt).toLocaleDateString()}
            </td>

          </tr>

        ))}

      </tbody>

    </table>
    <div className="text-end mt-3">

  <Link
    to="/history"
    className="btn btn-outline-primary"
  >
    View Full History →
  </Link>

</div>

  </div>

</div>


</div>
);
}

export default Dashboard;