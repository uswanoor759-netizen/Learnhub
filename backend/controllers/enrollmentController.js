
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// Enroll the logged-in student in a course
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
      progress: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully enrolled in the course.",
      enrollment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    }

    console.error("Enrollment error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to enroll in this course.",
    });
  }
};

// Get courses enrolled by the logged-in student
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    })
      .populate("course")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    console.error("Get enrolled courses error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your enrolled courses.",
    });
  }
};

module.exports = {
  enrollInCourse,
  getMyCourses,
};
