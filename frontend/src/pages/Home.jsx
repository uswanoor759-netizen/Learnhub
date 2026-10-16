import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseService";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchFeaturedCourses = async () => {
      try {
        const data = await getCourses();
        const list = data.courses || data.data || [];
        if (!cancelled) setCourses(list.slice(0, 3));
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load courses right now."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFeaturedCourses();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="hero-badge">✦ YOUR JOURNEY STARTS HERE</span>

              <h1 className="hero-title mt-4">
                Learn skills.
                <br />
                Build your <span>future.</span>
              </h1>

              <p className="hero-description mt-4">
                Discover practical courses, learn from expert instructors, and
                turn your ambitions into real-world skills with LearnHub.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/courses" className="btn btn-primary btn-lg">
                  Explore Courses →
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-secondary btn-lg"
                >
                  Join for Free
                </Link>
              </div>

              <div className="hero-stats mt-5">
                <div>
                  <h3>Learn</h3>
                  <p>At your own pace</p>
                </div>

                <div>
                  <h3>Grow</h3>
                  <p>Build practical skills</p>
                </div>

                <div>
                  <h3>Achieve</h3>
                  <p>Reach your goals</p>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-visual">
                <div className="visual-orbit orbit-one"></div>
                <div className="visual-orbit orbit-two"></div>

                <div className="learning-card main-learning-card">
                  <div className="learning-icon">🎓</div>

                  <p className="small text-secondary mb-2">
                    YOUR LEARNING SPACE
                  </p>

                  <h4>Knowledge opens doors.</h4>

                  <p className="text-secondary mb-0">One lesson at a time.</p>
                </div>

                <div className="floating-card floating-top">
                  <span>✦</span> Keep growing
                </div>

                <div className="floating-card floating-bottom">
                  <span>✓</span> Learn something new
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-heading text-center">
            <span className="eyebrow">WHY LEARNHUB?</span>
            <h2>Learning made simple</h2>
            <p>
              Everything you need to take the next step in your learning
              journey.
            </p>
          </div>

          <div className="row g-4 mt-3">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon icon-blue">📚</div>
                <h4>Explore Courses</h4>
                <p>
                  Discover learning opportunities across different subjects and
                  skill levels.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon icon-teal">🚀</div>
                <h4>Learn at Your Pace</h4>
                <p>
                  Build your knowledge step by step and make progress towards
                  your goals.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon icon-purple">🎯</div>
                <h4>Track Your Progress</h4>
                <p>
                  Keep your learning journey organized as you work through your
                  enrolled courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <span className="eyebrow">FROM THE DATABASE</span>
            <h2 className="mt-2 mb-1">Featured courses</h2>
            <p className="text-secondary mb-0">
              Live courses pulled from LearnHub’s MongoDB collection.
            </p>
          </div>
          <Link to="/courses" className="btn btn-outline-primary">
            View all courses
          </Link>
        </div>

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
            {error} Make sure the backend is running on port 5000.
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="empty-courses text-center">
            <div className="empty-icon">📚</div>
            <h3>No courses in the database yet</h3>
            <p>
              The server and MongoDB are connected, but the courses collection
              is empty. Seed sample courses or create them from an instructor
              account.
            </p>
            <Link to="/courses" className="btn btn-primary mt-2">
              Open course catalog
            </Link>
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="row g-4">
            {courses.map((course) => (
              <div className="col-sm-6 col-lg-4" key={course._id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card text-center">
            <span className="eyebrow">START TODAY</span>
            <h2>Your next chapter starts here.</h2>
            <p>Create your account and begin exploring new skills.</p>
            <Link to="/register" className="btn btn-light btn-lg mt-2">
              Get Started →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
