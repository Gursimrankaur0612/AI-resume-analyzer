import { useEffect, useState } from "react";
import api from "../api";

function InterviewQuestions() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState("");
  const [questions, setQuestions] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [answers, setAnswers] = useState({});
const [loadingAnswer, setLoadingAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("Medium");
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

  const generateQuestions = async () => {
    if (!file || !jobId) {
      alert("Please upload a resume and enter Job ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobId", jobId);
    formData.append("difficulty", difficulty);

    try {
      setLoading(true);

      const response = await api.post("/resume/interview-questions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setQuestions(response.data);

const parsedQuestions = response.data
  .split(/\n(?=\d+\.)/)
  .map((q) => q.trim())
  .filter((q) => /^\d+\./.test(q));

setQuestionList(parsedQuestions);
    } catch (error) {
      console.error(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };
  const generateAnswer = async (question, index) => {

  try {

    setLoadingAnswer(index);

    const response = await api.post("/resume/interview-answer", {
      question: question
    });

    setAnswers(prev => ({
      ...prev,
      [index]: response.data
    }));

  } catch (error) {

    console.error(error);

    alert("Failed to generate answer.");

  } finally {

    setLoadingAnswer(null);

  }

};

  return (
  <div className="card p-4 shadow-sm">

    <div className="text-center mb-5">

  <h1 className="display-4 fw-bold">
    🎤 AI Interview Assistant
  </h1>

  <p className="text-muted fs-5">
    Generate personalized interview questions from your resume using Google Gemini AI.
  </p>

</div>

    <input
        className="form-control"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
    />

    <br />

    <select
    className="form-control"
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

<label className="form-label fw-semibold">
    Difficulty
</label>

<select
    className="form-control"
    value={difficulty}
    onChange={(e) => setDifficulty(e.target.value)}
>

    <option>Easy</option>

    <option>Medium</option>

    <option>Hard</option>

</select>

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

    {questionList.length > 0 && (

<div className="mt-4">

<h3 className="mb-4 fw-bold">
Generated Questions
</h3>

{questionList.map((question, index) => (

<div
key={index}
className="card shadow-lg border-0 rounded-4 mb-4"
data-aos="fade-up"
>

<div className="card-body">

<div className="d-flex justify-content-between align-items-center mb-3">

<h5 className="fw-bold text-primary mb-0">
Question {index + 1}
</h5>

<span
className={`badge ${
index < 5
? "bg-primary"
: index < 8
? "bg-success"
: "bg-warning text-dark"
}`}
>

{
index < 5
? "Technical"
: index < 8
? "HR"
: "Scenario"
}

</span>

</div>

<p
className="fs-5"
style={{ lineHeight: "1.8" }}
>
{question.replace(/^\d+\.\s*/, "")}
</p>

<div className="mt-3">

<button
className="btn btn-outline-primary"
onClick={() =>
generateAnswer(
question.replace(/^\d+\.\s*/, ""),
index
)
}
>
💡 Show Ideal Answer
</button>

</div>

{loadingAnswer === index && (

<p className="mt-3 text-primary">

Generating answer...

</p>

)}

{answers[index] && (

<div className="alert alert-success mt-3">

<strong>Ideal Answer</strong>

<hr />

<p className="mb-0">

{answers[index]}

</p>

</div>

)}

</div>

</div>

))}

</div>

)}

</div>
);
}

export default InterviewQuestions;