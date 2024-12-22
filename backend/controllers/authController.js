import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import User from "../models/userSchema.js";
import createError from "../utils/createError.js";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

export const register = async (req, res, next) => {
  try {
    const hashPass = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      dp: req.file ? req.file.path : null, // Save file path
      country: req.body.country,
      mobile: req.body.mobile,
      isSeller: req.body.isSeller,
    });

    const savedUser = await newUser.save();

    // Generate JWT token for the new user
    const token = jwt.sign(
      {
        id: savedUser._id,
        isSeller: savedUser.isSeller,
      },
      process.env.KEY_JWT
      // { expiresIn: "1h" }
    );

    // Exclude password from the response
    const { password, ...userData } = savedUser._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        // secure: false, // Enable for HTTPS
        // sameSite: "lax", // Adjust based on client/server setup
      })
      .status(201)
      .send({ ...userData, token }); // Include the token in the response
  } catch (err) {
    next(err);
  }
};

// Make sure to export the upload middleware
export const uploadUserImage = upload.single("dp");

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong email or password"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.KEY_JWT
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        // secure: false,
        // sameSite: "lax",
      })
      .status(200)
      .send({ ...info, token });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  } catch (err) {
    next(err);
  }
};
