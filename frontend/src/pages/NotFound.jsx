import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container py-5 text-center">
      <h1>404 - Page Not Found</h1>
      <p className="text-secondary mt-3">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;
