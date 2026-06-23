import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/resume/history")
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="card p-4 mt-4">
      <h2>Analysis History</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Score</th>
            <th>ATS Match</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.jobTitle}</td>
              <td>{item.score}</td>
              <td>{item.atsMatch}%</td>
              <td>{item.analyzedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;