import User from "../models/userSchema.js";
import createError from "../utils/createError.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) next(createError(404, "User not found!"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "you can delete only your account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    return res.status(402).send("User deleted!");
  } catch (err) {
    next(err);
  }
};
