import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

export const register = async (req, res) => {
  try {
    const hashPass = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashPass,
    });
    await newUser.save();
    res.status(201).send("user is created");
  } catch (err) {
    res.status(500).send("error in authController: " + err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(404).send("user not found");
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send("wrong name or password");

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    res.status(500).send("error in authController: " + err);
  }
};

export const logout = async (req, res) => {};
