
const Course = require("../models/Course");

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch courses.",
    });
  }
};

// Get one course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to fetch course.",
    });
  }
};

// Create a course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required.",
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      price: price ?? 0,
      instructor: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error.message);

    return res.status(400).json({
      success: false,
      message: "Unable to create course. Check the submitted data.",
    });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const isAdmin = req.user.role === "admin";
    const isInstructor =
      course.instructor.toString() === req.user._id.toString();

    if (!isAdmin && !isInstructor) {
      return res.status(403).json({
        success: false,
        message: "You cannot edit this course.",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "price",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        course[field] = req.body[field];
      }
    });

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      course,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unable to update course.",
    });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const isAdmin = req.user.role === "admin";
    const isInstructor =
      course.instructor.toString() === req.user._id.toString();

    if (!isAdmin && !isInstructor) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this course.",
      });
    }

    await course.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to delete course.",
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
