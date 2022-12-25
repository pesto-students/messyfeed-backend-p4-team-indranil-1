import Mess from "../models/Mess.js";
import Review from "../models/Review.js";
import Customer from "../models/Customer.js";

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const messResults = await Mess.find({
      pincode: query,
    });
    res.status(200).json(messResults);
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const customer = Customer.find({ phoneNo: req.params.phoneNo });
    if (!customer) return next(createError(404, "You are not authenticated"));
    if (req.params.messId === customer.messId) {
      const newReview = new Review({
        userId: req.user.id,
        messId: customer.messId,
        custId: customer.id,
        ...req.body,
      });
      const savedReview = await newReview.save();
      res.status(200).send(savedReview);
    } else {
      return next(createError(403, "You can update only your customer!"));
    }
  } catch (err) {
    next(err);
  }
};
