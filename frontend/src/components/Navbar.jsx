import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🤖 AI Resume Analyzer
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          <Link className="nav-link" to="/analyze">
            Resume Analyzer
          </Link>

          <Link className="nav-link" to="/interview">
            Interview AI
          </Link>

          <Link className="nav-link" to="/improver">
            Resume Improver
          </Link>

          <Link className="nav-link" to="/history">
            History
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;