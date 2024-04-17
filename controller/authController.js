import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import Jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User created successfully");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    //finding username in the db
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return next(createError(404, "User not found"));

    //comparing pwd if user has been found
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Bad request, wrong username or password"));

    //using jwt to check if pwd is correct. for each admin, jwt will be used to verify the req.later set token to cookieparser in server.js
    const token = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    //hiding pwd, admin & other details in the response
    const { password, isAdmin, ...otherdetails } = user._doc;
    // res.status(200).json(user) ////////// httpOnly: true... so that no other client can access this cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherdetails });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
};
