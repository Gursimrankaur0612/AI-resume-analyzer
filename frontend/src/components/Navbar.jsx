import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          🤖 AI Resume Analyzer
        </NavLink>

        <div className="navbar-nav ms-auto">

          <NavLink className="nav-link" to="/">
  Home
</NavLink>

<NavLink className="nav-link" to="/dashboard">
  Dashboard
</NavLink>

          <NavLink className="nav-link" to="/analyze">
            Resume Analyzer
          </NavLink>

          <NavLink className="nav-link" to="/interview">
            Interview AI
          </NavLink>

          <NavLink className="nav-link" to="/improver">
            Resume Improver
          </NavLink>

          <NavLink className="nav-link" to="/history">
            History
          </NavLink>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;