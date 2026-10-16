
const express = require("express");

const {
  enrollInCourse,
  getMyCourses,
} = require("../controllers/enrollmentController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Enroll a logged-in student in a course
router.post(
  "/",
  protect,
  authorize("student"),
  enrollInCourse
);

// Get courses enrolled by the logged-in student
router.get(
  "/my-courses",
  protect,
  authorize("student"),
  getMyCourses
);

module.exports = router;
