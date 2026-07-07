import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        <NavLink
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          🤖 AI Resume Analyzer
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/analyze"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                Resume Analyzer
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/interview"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                Interview AI
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/improver"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                Resume Improver
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold" : "nav-link"
                }
              >
                History
              </NavLink>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;