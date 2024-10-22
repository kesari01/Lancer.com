import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
// import conversationRoute from "./routes/conversationRoutes.js";
// import gigRoute from "./routes/gigRoutes.js";
// import messageRoute from "./routes/messageRoutes.js";
// import orderRoute from "./routes/orderRoutes.js";
// import reviewRoute from "./routes/conversationRoutes.js";
// import userRoute from "./routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(express.json()); //allow to pass inputs field from frontend to backend in json format

app.use("/api/auth", authRoute);
// app.use("/api/conversations", conversationRoute);
// app.use("/api/gigs", gigRoute);
// app.use("/api/messages", messageRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/reviews", reviewRoute);
// app.use("/api/users", userRoute);

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
