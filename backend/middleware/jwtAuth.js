// import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

// export const verifyToken = async (req, res, next) => {
//   const token = req.headers.cookie?.split("=")[1]; // Extract token from Authorization header
//   if (!token) return next(createError(401, "Not Authenticated!"));

//   jwt.verify(token, process.env.KEY_JWT, async (err, payload) => {
//     if (err) return next(createError(403, "Token not valid!"));
//     req.userId = payload.id;
//     req.isSeller = payload.isSeller;
//     next();
//   });
// };

import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, "No token provided"));
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(createError(401, "Invalid token format"));
  }
  jwt.verify(token, process.env.KEY_JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.userId = user.id;
    req.isSeller = user.isSeller;
    next();
  });
};
