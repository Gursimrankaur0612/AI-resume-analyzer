function AnalysisResult({ result }) {
  if (!result) return null;

  return (
    <div className="card shadow-lg border-0 rounded-4 mt-5 p-4">
      <div className="text-center mb-4">

  <h2 className="fw-bold">
    🎯 Analysis Result
  </h2>

  <p className="text-muted">
    AI has analyzed your resume successfully.
  </p>

</div>

      <div className="alert alert-primary">

  <strong>
    <i className="bi bi-briefcase-fill me-2"></i>

    Target Job:
  </strong>

  {result.jobTitle}

</div>

      <div className="row mt-4">

  <div className="col-md-6">

    <div className="card text-center shadow-sm border-0 bg-success text-white h-100">

      <div className="card-body">

        <i className="bi bi-award-fill display-4"></i>

        <h5 className="mt-3">
          Resume Score
        </h5>

        <h1 className="display-3 fw-bold">
          {result.score}%
        </h1>

      </div>

    </div>

  </div>

  <div className="col-md-6">

    <div className="card text-center shadow-sm border-0 bg-primary text-white h-100">

      <div className="card-body">

        <i className="bi bi-bullseye display-4"></i>

        <h5 className="mt-3">
          ATS Match
        </h5>

        <h1 className="display-3 fw-bold">
          {result.atsMatch}%
        </h1>

      </div>

    </div>

  </div>

</div>

      <div className="card mt-4 shadow-sm border-0">

  <div className="card-body">

    <h4 className="fw-bold mb-3">
      <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
      Missing Skills
    </h4>

    {result.missingSkills?.length > 0 ? (

      result.missingSkills.map((skill, index) => (

        <span
          key={index}
          className="badge rounded-pill bg-danger fs-6 px-3 py-2 me-2 mb-2"
        >
          {skill}
        </span>

      ))

    ) : (

      <div className="alert alert-success mb-0">

        <i className="bi bi-check-circle-fill me-2"></i>

        Excellent! No missing skills found.

      </div>

    )}

  </div>

</div>
      <div className="card shadow-sm border-0 mt-4">

  <div className="card-body">

    <h4 className="fw-bold mb-3">

      <i className="bi bi-stars text-warning me-2"></i>

      AI Career Suggestions

    </h4>

    <div
      className="bg-light rounded-4 p-4"
      style={{
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
        fontSize: "16px"
      }}
    >
      {result.aiFeedback}
    </div>

  </div>

</div>
    </div>
  );
}

export default AnalysisResult;