import { useState } from "react";
import axios from "axios";
import AnalysisResult from "./AnalysisResult";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobId", 1);

    try {

      const response = await axios.post(
        "http://localhost:8080/resume/analyze",
        formData
      );

      console.log(response.data);

      setResult(response.data);

      alert("Resume analyzed successfully!");

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    }
  };

  return (
    <div className="card p-3 mt-4">

      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button
        className="btn btn-primary"
        onClick={handleUpload}
      >
        Analyze Resume
      </button>

      {file && (
        <p className="mt-2">
          Selected File: {file.name}
        </p>
      )}

      <AnalysisResult result={result} />

    </div>
  );
}

export default ResumeUpload;