import Mess from "../models/Mess.js";
import Review from "../models/Review.js";
import Customer from "../models/Customer.js";
import { createError } from "../error.js";
import { validationResult } from "express-validator";

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const messResults = await Mess.find({
      pincode: query,
    });
    if (!messResults)
      return next(createError(404, "There are no mess in your area"));
    res.status(200).json(messResults);
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const customer = await Customer.findOne({
        $and: [
          { messId: { $in: [req.body.messId] } },
          { email: { $in: [req.body.email] } },
        ],
      });
      if (!customer)
        return next(
          createError(
            404,
            "You cannot give review to the mess you haven't subscribed!"
          )
        );
      const newReview = new Review({
        userId: customer.userId,
        messId: req.body.messId,
        custId: customer.id,
        ...req.body,
      });
      const savedReview = await newReview.save();
      res.status(200).send(savedReview);
    } catch (err) {
      next(err);
    }
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ messId: req.params.id });
    if (!reviews) return next(createError(404, "No Plan is there to display!"));
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};
