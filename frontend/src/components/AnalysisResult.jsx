function AnalysisResult({ result }) {

  if (!result) {
    return null;
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        Analysis Result
      </div>

      <div className="card-body">

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

        <p>
          <strong>Matched Skills:</strong>
        </p>

        <ul>
          {result.matchedSkills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <p>
          <strong>Missing Skills:</strong>
        </p>

        <ul>
          {result.missingSkills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default AnalysisResult;