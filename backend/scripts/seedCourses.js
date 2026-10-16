require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");

const sampleCourses = [
  {
    title: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS, and JavaScript by building real pages and interactive components from scratch.",
    category: "Web Development",
    price: 0,
  },
  {
    title: "React for Beginners",
    description:
      "Build modern user interfaces with components, props, state, and React Router.",
    category: "Frontend",
    price: 29,
  },
  {
    title: "Node.js and Express API",
    description:
      "Create REST APIs, connect MongoDB, and protect routes with authentication.",
    category: "Backend",
    price: 39,
  },
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    let instructor = await User.findOne({ role: "instructor" });

    if (!instructor) {
      console.log("No instructor found. Run: node scripts/createInstructor.js");
      return;
    }

    const existingCount = await Course.countDocuments();
    if (existingCount > 0) {
      console.log(`Courses already exist (${existingCount}). Skipping seed.`);
      return;
    }

    await Course.insertMany(
      sampleCourses.map((course) => ({
        ...course,
        instructor: instructor._id,
      }))
    );

    console.log("Sample courses added successfully.");
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedCourses();
