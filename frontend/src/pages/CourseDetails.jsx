
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getCourseById } from "../services/courseService";
import { useAuth } from "../context/useAuth";

const ENROLL_API = "http://localhost:5000/api/enroll";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentMessage, setEnrollmentMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchCourse = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getCourseById(id);

        if (!cancelled) {
          setCourse(response.course || response.data || null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load course details."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCourse();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user?.role !== "student") {
      setEnrollmentMessage(
        "Only student accounts can enroll in courses."
      );
      return;
    }

    setEnrolling(true);
    setEnrollmentMessage("");

    try {
      await axios.post(
        ENROLL_API,
        { courseId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrollmentMessage(
        "Successfully enrolled! You can find this course in your learning dashboard."
      );
    } catch (err) {
      setEnrollmentMessage(
        err.response?.data?.message ||
          "Enrollment failed. Please try again."
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-secondary mt-3">
          Loading course details...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <main className="container py-5 text-center">
        <h2>Course not found</h2>
        <p className="text-secondary mt-3">
          {error || "This course may no longer be available."}
        </p>
        <Link to="/courses" className="btn btn-primary mt-3">
          Browse Courses
        </Link>
      </main>
    );
  }

  return (
    <main className="course-details-page">
      <section className="course-details-banner">
        <div className="container">
          <Link to="/courses" className="back-link">
            ← Back to Courses
          </Link>

          <div className="row align-items-center g-5 mt-3">
            <div className="col-lg-8">
              <span className="course-details-category">
                {course.category}
              </span>

              <h1 className="mt-4">{course.title}</h1>

              <p className="course-details-description mt-3">
                {course.description}
              </p>

              <p className="course-details-instructor mt-4">
                Instructor:{" "}
                <strong>
                  {course.instructor?.name || "LearnHub Instructor"}
                </strong>
              </p>
            </div>

            <div className="col-lg-4">
              <div className="course-enrollment-card">
                <div className="course-preview-icon">📖</div>

                <p className="text-secondary mt-3 mb-1">
                  Course price
                </p>

                <h2>
                  {Number(course.price) === 0
                    ? "Free"
                    : `$${Number(course.price).toFixed(2)}`}
                </h2>

                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    className="btn btn-primary btn-lg w-100 mt-3"
                  >
                    Log in to Enroll
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg w-100 mt-3"
                    onClick={handleEnroll}
                    disabled={enrolling || user?.role !== "student"}
                  >
                    {enrolling
                      ? "Enrolling..."
                      : user?.role === "student"
                        ? "Enroll Now"
                        : "Student Access Only"}
                  </button>
                )}

                {enrollmentMessage && (
                  <div
                    className="alert alert-info mt-3 mb-0"
                    role="status"
                  >
                    {enrollmentMessage}
                  </div>
                )}

                <p className="small text-secondary text-center mt-3 mb-0">
                  Sign in to access your learning journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="course-about">
          <span className="eyebrow">ABOUT THIS COURSE</span>
          <h2 className="mt-3">What you'll learn</h2>
          <p className="mt-3">{course.description}</p>
          <p className="text-secondary mt-3">
            Explore the course content and build your skills at your
            own pace with LearnHub.
          </p>
        </div>
      </section>
    </main>
  );
}

export default CourseDetails;
