import User from "../models/User.js";
import Review from "../models/Review.js";
import { createError } from "../error.js";

//Update User
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));
    if (req.user.id === user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      return next(createError(403, "You can update only your Profile!"));
    }
  } catch (err) {
    next(err);
  }
};

//Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));
    if (req.user.id === user.id) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("The User has been deleted");
    } else {
      return next(createError(403, "You can delete only your Profile!"));
    }
  } catch (err) {
    next(err);
  }
};

//get an User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));
    if (req.user.role === "admin" || req.user.id === user.id) {
      res.status(200).json(user);
    } else {
      return next(
        createError(403, "You are not authenticated to view this Profile!")
      );
    }
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return next(createError(404, "Review not found!"));
    if (req.user.id === review.userId) {
      await Review.findByIdAndDelete(req.params.id);
      res.status(200).json("The Review has been deleted");
    } else {
      return next(createError(403, "You can delete only your Review!"));
    }
  } catch (err) {
    next(err);
  }
};
