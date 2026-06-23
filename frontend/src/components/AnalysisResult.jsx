function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div className="card mt-4 p-4">
      <h2>Analysis Result</h2>

      <div className="mt-3">
        <h5>Job Title</h5>
        <p>{result.jobTitle}</p>
      </div>

      <div className="mt-3">
        <h5>Resume Score</h5>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{ width: `${result.score}%` }}
          >
            {result.score}%
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h5>ATS Match</h5>
        <div className="progress">
          <div
            className="progress-bar bg-primary"
            style={{ width: `${result.atsMatch}%` }}
          >
            {result.atsMatch}%
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h5>Missing Skills</h5>

        {result.missingSkills?.length > 0 ? (
          result.missingSkills.map((skill, index) => (
            <span
              key={index}
              className="badge bg-danger me-2"
            >
              {skill}
            </span>
          ))
        ) : (
          <p>No missing skills 🎉</p>
        )}
      </div>
    </div>
  );
}

export default AnalysisResult;