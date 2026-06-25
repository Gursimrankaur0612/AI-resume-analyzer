import { useState } from "react";
import axios from "axios";
import AnalysisResult from "./AnalysisResult";
import { toast } from "react-toastify";




function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
  if (!file) {
    toast.warning("Select a PDF first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("jobId", 1);

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

  return (
    <div className="card p-4 mt-4">
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
  disabled={loading}
  onClick={handleUpload}
>
  {loading ? "Analyzing..." : "Analyze Resume"}
</button>

      {file && (
        <p className="mt-3">
          Selected File: {file.name}
        </p>
      )}

      {result && <AnalysisResult result={result} />}
    </div>
  );
}

export default ResumeUpload;