import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  console.log(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ email: req.body.email });
    // if user not found
    !user && res.status(404).json("User not found");
    // if user found
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password is not valid
    !validPassword && res.status(400).json("Wrong password. please try again");

    // if password is valid
    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });

    // first saprate password from user object
    const { password, ...others } = user._doc;

    // then send user object without password and store current user in local storage / cookie
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    console.log(error);
  }
};
