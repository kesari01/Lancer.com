import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) return next(createError(401, "Not Authenticated!"));

  jwt.verify(token, process.env.KEY_JWT, async (err, payload) => {
    if (err) return next(createError(403, "Token not valid!"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
