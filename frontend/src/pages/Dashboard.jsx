import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/resume/dashboard")
      .then((response) => {
        console.log(response.data);
        setDashboard(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!dashboard) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div>
      <h1>AI Resume Analyzer</h1>

      <h2>Dashboard</h2>

      <p>Total Analyses: {dashboard.totalAnalyses}</p>

      <p>Average Score: {dashboard.averageScore}</p>

      <p>Average ATS Match: {dashboard.averageAtsMatch}</p>
    </div>
  );
}

export default Dashboard;