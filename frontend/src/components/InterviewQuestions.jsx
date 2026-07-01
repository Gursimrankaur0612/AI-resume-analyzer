import { useState } from "react";
import axios from "axios";

function InterviewQuestions() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!file || !jobId) {
      alert("Please upload a resume and enter Job ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobId", jobId);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/resume/interview-questions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setQuestions(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="card p-4 shadow-sm">

    <h3 className="mb-3">
        AI Interview Question Generator
    </h3>

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
        className="btn btn-success"
        onClick={generateQuestions}
    >
        Generate Questions
    </button>

    <br />

    {loading && (
        <div className="alert alert-info">
            AI is generating interview questions...
        </div>
    )}

    {questions && (
        <div className="card mt-3 p-3 bg-light">
            <pre style={{ whiteSpace: "pre-wrap" }}>
                {questions}
            </pre>
        </div>
    )}

</div>
);
}

export default InterviewQuestions;