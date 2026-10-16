
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";

const API_URL = "http://localhost:5000/api/enroll";

function Dashboard() {
  const { user, token, authLoading } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !token || !user || user.role !== "student") {
      return;
    }

    let cancelled = false;

    const fetchMyCourses = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `${API_URL}/my-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cancelled) return;

        const data = response.data;
        const enrollments = Array.isArray(data)
          ? data
          : data.enrollments || data.courses || data.data || [];

        setCourses(enrollments);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load your enrolled courses."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMyCourses();

    return () => {
      cancelled = true;
    };
  }, [token, user, authLoading]);

  if (authLoading) {
    return (
      <main className="container py-5 text-center">
        <p>Checking your login...</p>
      </main>
    );
  }

  if (!token || !user) {
    return (
      <main className="container py-5 text-center">
        <h1>Student Dashboard</h1>
        <p>Please log in to view your enrolled courses.</p>
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
      </main>
    );
  }

  if (user.role !== "student") {
    return (
      <main className="container py-5 text-center">
        <h1>Dashboard</h1>
        <p>This dashboard is available to student accounts.</p>
        <Link to="/courses" className="btn btn-primary">
          Browse Courses
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="mb-4">
        <p className="text-primary fw-semibold mb-2">
          LEARNHUB DASHBOARD
        </p>
        <h1>Welcome, {user.name}!</h1>
        <p className="text-secondary">
          Continue learning with your enrolled courses.
        </p>
      </div>

      <hr className="my-4" />

      <h2 className="h4 mb-4">My Courses</h2>

      {loading && <p>Loading your courses...</p>}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="card border-0 shadow-sm p-4 text-center">
          <h3 className="h5">No enrolled courses yet</h3>
          <p className="text-secondary">
            Explore LearnHub and enroll in a course to get started.
          </p>
          <Link to="/courses" className="btn btn-primary">
            Explore Courses
          </Link>
        </div>
      )}

      <div className="row g-4">
        {courses.map((enrollment) => {
          const course = enrollment.course || enrollment;

          if (!course?._id) return null;

          return (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={enrollment._id || course._id}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <span className="badge text-bg-primary mb-3">
                    {course.category || "Course"}
                  </span>

                  <h3 className="h5">{course.title}</h3>

                  <p className="text-secondary">
                    {course.description ||
                      "Continue your learning journey."}
                  </p>

                  <p className="small mb-3">
                    Progress: {enrollment.progress ?? 0}%
                  </p>

                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-outline-primary"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Dashboard;
