import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <main className="container py-5 text-center">
      <h1>Access denied</h1>
      <p className="text-secondary mt-3">
        Your account does not have permission to view this page.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </main>
  );
}

export default Unauthorized;
