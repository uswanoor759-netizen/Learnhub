import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <article className="course-card">
      <div className="course-card-art">
        <span className="course-category">{course.category}</span>
        <span className="course-book-icon">▤</span>
      </div>

      <div className="course-card-body">
        <p className="course-instructor">
          Instructor: {course.instructor?.name || "LearnHub Instructor"}
        </p>

        <h3>{course.title}</h3>

        <p className="course-description">{course.description}</p>

        <div className="course-card-bottom">
          <span className="course-price">
            {Number(course.price) === 0
              ? "Free"
              : `$${Number(course.price).toFixed(2)}`}
          </span>

          <Link
            to={`/courses/${course._id}`}
            className="btn btn-outline-primary btn-sm"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
