
import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="hero-badge">
                ✦ YOUR JOURNEY STARTS HERE
              </span>

              <h1 className="hero-title mt-4">
                Learn skills.
                <br />
                Build your <span>future.</span>
              </h1>

              <p className="hero-description mt-4">
                Discover practical courses, learn from expert
                instructors, and turn your ambitions into real-world
                skills with LearnHub.
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

    <p className="text-secondary mb-4">
      One lesson at a time.
    </p>

    <div className="learning-progress">
      <div className="mb-2">
  <span>YOUR NEXT CHAPTER</span>
</div>

      <div className="progress-track">
        <div className="progress-fill"></div>
      </div>
    </div>

    <div className="learning-quote">
      <span>✦</span>
      Every expert was once a beginner.
    </div>
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
              Everything you need to take the next step in your
              learning journey.
            </p>
          </div>

          <div className="row g-4 mt-3">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon icon-blue">📚</div>
                <h4>Explore Courses</h4>
                <p>
                  Discover learning opportunities across different
                  subjects and skill levels.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon icon-teal">🚀</div>
                <h4>Learn at Your Pace</h4>
                <p>
                  Build your knowledge step by step and make progress
                  towards your goals.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon icon-purple">🎯</div>
                <h4>Track Your Progress</h4>
                <p>
                  Keep your learning journey organized as you work
                  through your enrolled courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card text-center">
            <span className="eyebrow">START TODAY</span>
            <h2>Your next chapter starts here.</h2>

            <p>
              Create your account and begin exploring new skills.
            </p>

            <Link
              to="/register"
              className="btn btn-light btn-lg mt-2"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;