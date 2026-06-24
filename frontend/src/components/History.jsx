import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);
  const deleteAnalysis = async (id) => {

  try {

    await axios.delete(
      `http://localhost:8080/resume/history/${id}`
    );

   setHistory(prev =>
  prev.filter(item => item.id !== id)
);

  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    axios
      .get("http://localhost:8080/resume/history")
      .then((response) => {
       setHistory(
  response.data.sort(
    (a, b) =>
      new Date(b.analyzedAt) -
      new Date(a.analyzedAt)
  )
);
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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
  <span className="badge bg-primary">
    {item.jobTitle || "General"}
  </span>
</td>
              <td>{item.score}</td>
              <td>{item.atsMatch}%</td>
              <td>
  {new Date(item.analyzedAt)
    .toLocaleString()}
</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => deleteAnalysis(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
