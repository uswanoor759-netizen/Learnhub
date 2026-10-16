
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.courses || data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="courses-page">
      <section className="courses-banner">
        <div className="container">
          <span className="eyebrow">YOUR LEARNING JOURNEY</span>
          <h1 className="mt-3">Explore Courses</h1>
          <p>
            Discover new skills and find a course that matches your goals.
          </p>
        </div>
      </section>

      <section className="container py-5">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3">Loading courses...</p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="empty-courses text-center">
            <div className="empty-icon">📚</div>
            <h3>Our learning library is growing</h3>
            <p>
              No courses are available yet. Check back soon for new
              learning opportunities.
            </p>
            <Link to="/register" className="btn btn-primary mt-2">
              Join LearnHub
            </Link>
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h4 mb-1">All Courses</h2>
                <p className="text-secondary mb-0">
                  {courses.length} courses available
                </p>
              </div>
            </div>

            <div className="row g-4">
              {courses.map((course) => (
                <div className="col-sm-6 col-lg-4" key={course._id}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Courses;
