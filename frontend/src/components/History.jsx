import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
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
    <div className="card shadow-lg border-0 rounded-4 p-5 mt-4">
      <div className="text-center mb-4">

  <h1 className="display-5 fw-bold">

    <i className="bi bi-clock-history text-primary me-2"></i>

    Resume Analysis History

  </h1>

  <p className="text-muted fs-5">

    View, download and manage all previously analyzed resumes.

  </p>

</div>
<div className="mb-4">

  <input
    type="text"
    className="form-control form-control-lg"
    placeholder="🔍 Search by Job Title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

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
         {history
  .filter((item) =>
    (item.jobTitle || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
  <span className="badge bg-primary">
    {item.jobTitle || "General"}
  </span>
</td>
             <td>

  <span
    className={`badge rounded-pill px-3 py-2 ${
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
    className={`badge rounded-pill px-3 py-2 ${
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
  {new Date(item.analyzedAt)
    .toLocaleString()}
</td>
             <td>
  <button
   
  className="btn btn-outline-primary btn-sm me-2"
    onClick={() => downloadReport(item.id)}
  >
    <i className="bi bi-download me-1"></i>

    
  </button>

 <button
  className="btn btn-outline-secondary btn-sm"
    onClick={() => deleteAnalysis(item.id)}
  >
  <i className="bi bi-trash me-1"></i>

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
