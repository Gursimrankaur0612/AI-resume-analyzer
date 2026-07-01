import { useState } from "react";
import axios from "axios";

function ResumeImprover() {

    const [file, setFile] = useState(null);
    const [jobId, setJobId] = useState("");
    const [improvements, setImprovements] = useState("");
    const [loading, setLoading] = useState(false);

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

            const response = await axios.post(
                "http://localhost:8080/resume/improve",
                formData
            );

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

            <h3>AI Resume Improver</h3>

            <input
                className="form-control"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br />

            <input
                className="form-control"
                type="number"
                placeholder="Enter Job ID"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
            />

            <br />

            <button
                className="btn btn-primary"
                onClick={improveResume}
            >
                Improve Resume
            </button>

            <br />

            {loading &&
                <div className="alert alert-info">
                    AI is improving your resume...
                </div>
            }

            {improvements && (
    <div className="card mt-4 border-success shadow-sm">

        <div className="card-header bg-success text-white">
            AI Resume Suggestions
        </div>

        <div className="card-body">

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                    fontSize: "15px",
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