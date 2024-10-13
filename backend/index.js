import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

const app = express();
dotenv.config()

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful connection
    app.listen(process.env.BACKEND_PORT || 8800, () => {
      console.log("Server is running on port");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
