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
  axios.get(
  "https://ai-resume-analyzer-enam.onrender.com/api/jobdescriptions"
)
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
  "https://ai-resume-analyzer-enam.onrender.com/resume/analyze",
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
    <div className="card shadow-lg border-0 rounded-4 p-5 mt-4">

  <div className="text-center mb-5">

    <h1 className="display-5 fw-bold">
      📄 Upload Resume
    </h1>

    <p className="text-muted fs-5">
      Upload your resume and select a job description.
      Our AI will analyze your resume, calculate ATS score,
      identify missing skills, and generate improvement suggestions.
    </p>

  </div>

      <div className="border rounded-4 p-5 text-center bg-light">

  <i
    className="bi bi-cloud-arrow-up-fill text-primary"
    style={{ fontSize: "60px" }}
  ></i>

  <h4 className="mt-3">
    Upload Your Resume
  </h4>

  <p className="text-muted">
    Supported format: PDF
  </p>

  <input
    className="form-control mt-3"
    type="file"
    accept=".pdf"
    onChange={(e) => setFile(e.target.files[0])}
  />

</div>

      <br />

    <div className="mt-4">

  <label className="form-label fw-bold fs-5">

    <i className="bi bi-briefcase-fill text-primary me-2"></i>

    Select Job Description

  </label>

  <select
    className="form-select form-select-lg"
    value={jobId}
    onChange={(e) => setJobId(e.target.value)}
  >

    <option value="">Choose a Job Role</option>

    {jobs.map((job) => (

      <option key={job.id} value={job.id}>

        {job.jobTitle} • {job.companyName}

      </option>

    ))}

  </select>

</div>

     <div className="d-grid mt-4">

  <button
    className="btn btn-primary btn-lg py-3 fw-bold"
    disabled={loading}
    onClick={handleUpload}
  >

    {loading ? (
      <>
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
        ></span>

        Analyzing Resume...
      </>
    ) : (
      <>
        <i className="bi bi-stars me-2"></i>
        Analyze Resume with AI
      </>
    )}

  </button>

</div>

      {file && (

  <div className="alert alert-success mt-3">

    <i className="bi bi-file-earmark-pdf-fill me-2"></i>

    <strong>Selected:</strong> {file.name}

  </div>

)}

      {loading && (

  <div className="card shadow border-0 mt-5">

    <div className="card-body text-center p-5">

      <div
        className="spinner-border text-primary"
        style={{
          width: "4rem",
          height: "4rem"
        }}
      ></div>

      <h3 className="mt-4">
        🤖 AI is analyzing your resume...
      </h3>

      <p className="text-muted">

        Comparing resume with job description...

        <br />

        Calculating ATS score...

        <br />

        Detecting missing skills...

        <br />

        Generating AI suggestions...

      </p>

    </div>

  </div>

)}

{result && <AnalysisResult result={result} />}
    </div>
  );
}

export default ResumeUpload;