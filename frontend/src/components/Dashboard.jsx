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

      <h2 className="mb-3">Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Analyses</h5>
              <h2>{dashboard.totalAnalyses}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Average Score</h5>
              <h2>{dashboard.averageScore}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Average ATS</h5>
              <h2>{dashboard.averageAtsMatch}%</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;