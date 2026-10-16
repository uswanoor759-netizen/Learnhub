import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getCourses } from "../services/courseService";

const API_URL = "http://localhost:5000/api/courses";

function InstructorDashboard() {
  const { user, token } = useAuth();
  const instructorId = String(user?._id || user?.id || "");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "0",
  });

  const loadCourses = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getCourses();
      const list = data.courses || [];
      setCourses(
        list.filter((course) => {
          const owner = course.instructor?._id || course.instructor;
          return String(owner) === instructorId || user?.role === "admin";
        })
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load your courses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  let cancelled = false;

  const fetchCourses = async () => {
    setError("");

    try {
      const data = await getCourses();
      if (cancelled) return;

      const list = data.courses || [];
      setCourses(
        list.filter((course) => {
          const owner = course.instructor?._id || course.instructor;
          return String(owner) === instructorId || user?.role === "admin";
        })
      );
    } catch (err) {
      if (!cancelled) {
        setError(
          err.response?.data?.message || "Unable to load your courses."
        );
      }
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  fetchCourses();

  return () => {
    cancelled = true;
  };
}, [instructorId, user?.role]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await axios.post(
        API_URL,
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category.trim(),
          price: Number(formData.price) || 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormData({
        title: "",
        description: "",
        category: "",
        price: "0",
      });
      setMessage("Course created successfully.");
      await loadCourses();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to create the course."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm("Delete this course?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Course deleted.");
      await loadCourses();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to delete the course."
      );
    }
  };

  return (
    <main className="container py-5">
      <p className="text-primary fw-semibold mb-2">INSTRUCTOR STUDIO</p>
      <h1>Welcome, {user?.name}</h1>
      <p className="text-secondary">
        Create courses that students will see on the homepage and catalog.
      </p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <section className="card border-0 shadow-sm p-4 mb-5">
        <h2 className="h4 mb-4">Create a course</h2>
        <form onSubmit={handleCreate} className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              placeholder="Web Development"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              minLength={10}
              required
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Publish course"}
            </button>
          </div>
        </form>
      </section>

      <h2 className="h4 mb-3">Your courses</h2>
      {loading && <p>Loading your courses...</p>}

      {!loading && courses.length === 0 && (
        <p className="text-secondary">You have not published any courses yet.</p>
      )}

      <div className="row g-4">
        {courses.map((course) => (
          <div className="col-md-6 col-lg-4" key={course._id}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <span className="badge text-bg-primary mb-2">
                  {course.category}
                </span>
                <h3 className="h5">{course.title}</h3>
                <p className="text-secondary">{course.description}</p>
                <div className="d-flex gap-2">
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default InstructorDashboard;
