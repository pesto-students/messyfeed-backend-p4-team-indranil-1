import Mess from "../models/Mess.js";
import Plan from "../models/Plan.js";
import { createError } from "../error.js";

export const addMess = async (req, res, next) => {
  const newMess = new Mess({ userId: req.user.id, ...req.body });
  try {
    const savedMess = await newMess.save();
    res.status(200).json(savedMess);
  } catch (err) {
    next(err);
  }
};

export const updateMess = async (req, res, next) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) return next(createError(404, "Mess not found!"));
    if (req.user.id === mess.userId) {
      const updatedMess = await Mess.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMess);
    } else {
      return next(createError(403, "You can update only your mess!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteMess = async (req, res, next) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) return next(createError(404, "Mess not found!"));
    if (req.user.id === mess.userId) {
      await Mess.findByIdAndDelete(req.params.id);
      res.status(200).json("The Mess has been deleted");
    } else {
      return next(createError(403, "You can delete only your Mess!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getMess = async (req, res, next) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) return next(createError(404, "Mess not found!"));
    res.status(200).json(mess);
  } catch (err) {
    next(err);
  }
};

export const addPlan = async (req, res, next) => {
  const newPlan = new Plan({ userId: req.user.id, ...req.body });
  try {
    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (err) {
    next(err);
  }
};

export const updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return next(createError(404, "Plan not found!"));
    if (req.user.id === plan.userId) {
      const updatedPlan = await Plan.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPlan);
    } else {
      return next(createError(403, "You can update only your Plan!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return next(createError(404, "Plan not found!"));
    if (req.user.id === plan.userId) {
      await Plan.findByIdAndDelete(req.params.id);
      res.status(200).json("The Plan has been deleted");
    } else {
      return next(createError(403, "You can delete only your Plan!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({ userId: req.user.id });
    if (!plans) return next(createError(404, "No Plan is there to display!"));
    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};


// this for all users 
export const getMessPlans = async (req, res, next) => {
  try {
    const messId = req.params.id;
    const plans = await Plan.find({ messId });
    if (!plans) return next(createError(404, "No Plan is there to display!"));
    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};
