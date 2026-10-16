import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const dashboardPath =
    user?.role === "instructor" || user?.role === "admin"
      ? "/instructor"
      : "/dashboard";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-icon">L</span>
          <span className="brand-name">LearnHub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#learnHubNavbar"
          aria-controls="learnHubNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="learnHubNavbar">
          <div className="navbar-nav mx-auto gap-lg-3">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>

            <NavLink className="nav-link" to="/courses">
              Explore Courses
            </NavLink>

            {isAuthenticated && (
              <NavLink className="nav-link" to={dashboardPath}>
                Dashboard
              </NavLink>
            )}
          </div>

          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-3">
              <span className="text-secondary small">
                {user?.name} ({user?.role})
              </span>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link to="/login" className="btn btn-outline-primary px-4 py-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary px-4 py-2">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
