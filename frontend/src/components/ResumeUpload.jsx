import { useEffect, useState } from "react";
import axios from "axios";
import AnalysisResult from "./AnalysisResult";
import { toast } from "react-toastify";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");

 useEffect(() => {
  axios
    .get("http://localhost:8080/api/jobdescriptions")
    .then((response) => {
      console.log("API Response:", response.data);
      setJobs(response.data);
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}, []);

  const handleUpload = async () => {
    if (!file || !jobId) {
      toast.warning("Please select a resume and a job.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobId", jobId);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/resume/analyze",
        formData
      );

      console.log(response.data);
      setResult(response.data);

      toast.success("Resume analyzed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  console.log("Jobs State:", jobs);

  return (
    <div className="card p-4 mt-4">

      <h2 className="mb-4">
        Upload Resume
      </h2>

      <input
        className="form-control"
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />

      <select
        className="form-select"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
      >
        <option value="">Select a Job</option>

        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.jobTitle} - {job.companyName}
          </option>
        ))}
      </select>

      <br />

      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={handleUpload}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {file && (
        <p className="mt-3">
          <strong>Selected File:</strong> {file.name}
        </p>
      )}

      {result && <AnalysisResult result={result} />}
    </div>
  );
}

export default ResumeUpload;