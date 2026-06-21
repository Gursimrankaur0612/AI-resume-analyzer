import { useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a PDF first");
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

      setResult(response.data);

      alert("Resume analyzed successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Analyze Resume
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Analysis Result</h3>

          <p>
            <strong>Job Title:</strong> {result.jobTitle}
          </p>

          <p>
            <strong>Company:</strong> {result.companyName}
          </p>

          <p>
            <strong>Resume Score:</strong> {result.score}
          </p>

          <p>
            <strong>ATS Match:</strong> {result.atsMatch}%
          </p>

          <h4>Matched Skills</h4>
          <ul>
            {result.matchedSkills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h4>Missing Skills</h4>
          <ul>
            {result.missingSkills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h4>Suggestions</h4>
          <ul>
            {result.suggestions?.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;