
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createInstructor = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "instructor@learnhub.com";
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Instructor account already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "LearnHub@2026",
      12
    );

    await User.create({
      name: "LearnHub Instructor",
      email,
      password: hashedPassword,
      role: "instructor",
    });

    console.log("Instructor account created successfully.");
    console.log("Email:", email);
    console.log("Password: LearnHub@2026");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createInstructor();
