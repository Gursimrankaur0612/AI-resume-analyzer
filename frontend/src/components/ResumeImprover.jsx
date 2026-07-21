import { useEffect, useState } from "react";
import api from "../api";

function ResumeImprover() {

    const [file, setFile] = useState(null);
    const [jobId, setJobId] = useState("");
    const [improvements, setImprovements] = useState("");
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await api.get("/api/jobdescriptions");

      setJobs(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch jobs.");
    }
  };

  fetchJobs();
}, []);

    const improveResume = async () => {

        if (!file || !jobId) {
            alert("Please upload resume and enter Job ID.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobId", jobId);

        try {

            setLoading(true);

            const response = await api.post("/resume/improve", formData);

            setImprovements(response.data);

        } catch (error) {
            console.error(error);
            alert("Failed to generate improvements.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="card shadow-sm p-4">

            <h2 className="mb-4 fw-bold">
    ✨ AI Resume Improver
</h2>

<p className="text-muted">
    Upload your resume and let AI rewrite it to improve ATS score and professionalism.
</p>

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
    className="btn btn-success w-100"
    disabled={loading}
    onClick={improveResume}
>
    {loading ? "Improving Resume..." : "✨ Improve Resume"}
</button>

            <br />

            {loading &&
               <div className="alert alert-primary mt-3">

    <div className="spinner-border spinner-border-sm me-2"></div>

    Gemini AI is rewriting your resume...

</div>
            }

            {improvements && (
    <div className="card mt-4 border-success shadow-sm">

        <div className="card-header bg-success text-white">
            ✨ AI Enhanced Resume
        </div>

        <div className="card-body">

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                    fontSize:"16px",
                    lineHeight:"1.8",
                    marginBottom: 0
                }}
            >
                {improvements}
            </pre>

        </div>

    </div>
)}

        </div>

    );
}

export default ResumeImprover;