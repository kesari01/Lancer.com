import User from "../models/userSchema.js";

export const deleteUser = async (req, res) => {
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
