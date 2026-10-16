
const mongoose = require("mongoose");

/**
 * Connects LearnHub to MongoDB.
 * The connection URL is stored in backend/.env.
 */
const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is missing. Check your backend/.env file."
    );
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB connected successfully.");
};

module.exports = connectDatabase;
