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
const downloadReport = async (id) => {

  try {

    const response = await axios.get(
      `http://localhost:8080/resume/report/${id}`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = `Resume_Report_${id}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {

    console.error(error);

    alert("Download failed");

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
  <button
    className="btn btn-success btn-sm me-2"
    onClick={() => downloadReport(item.id)}
  >
    Download
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteAnalysis(item.id)}
  >
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
