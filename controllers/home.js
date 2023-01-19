import Mess from "../models/Mess.js";
import Review from "../models/Review.js";
import Customer from "../models/Customer.js";
import { createError } from "../error.js";
import { validationResult } from "express-validator";

export const search = async (req, res) => {
  console.log("Done");
  const query = req.query.q;
  try {
    const messResults = await Mess.find({
      pincode: query,
    });
    if (!messResults) return createError(404, "There are no mess in your area");
    res.status(200).json(messResults);
  } catch (err) {
    return err;
  }
};

export const addNewReview = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      $and: [
        { messId: { $in: [req.body.messId] } },
        { phoneNo: { $in: [req.body.phoneNo] } },
      ],
    });
    if (!customer)
      return createError(
        404,
        "You cannot give review to the mess you haven't subscribed!"
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
    return err;
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

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ messId: req.params.id });
    if (!reviews) return createError(404, "No Plan is there to display!");
    res.status(200).json(reviews);
  } catch (err) {
    return err;
  }
};

export const isReviewed = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    const reviews = await Review.find({ custId: customer._id });
    console.log(reviews);
    reviews && res.status(200).json({ isCheck: true });
    !reviews && res.status(200).send("not present");
  } catch (err) {
    next(err);
  }
};
