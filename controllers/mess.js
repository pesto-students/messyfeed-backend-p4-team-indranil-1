import Mess from "../models/Mess.js";
import Plan from "../models/Plan.js";
import { createError } from "../error.js";

export const addMess = async (req, res) => {
  const messCheck = await Mess.findOne({ userId: req?.user?.id });
  if (!messCheck) {
    const newMess = new Mess({ userId: req?.user?.id, ...req?.body });
    try {
      const savedMess = await newMess.save();
      console.log("Saved Messs...", savedMess);
      res.status(200).json(savedMess);
    } catch (err) {
      return err;
    }
  } else {
    res.status(401).send({
      message: "We are currently not supporting multiple messes for one owner!",
    });
  }
};

export const updateMess = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    if (!mess) return createError(404, "Mess not found!");
    if (req?.user?.id === mess?.userId) {
      const updatedMess = await Mess.findByIdAndUpdate(
        mess?.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log("Mess Updated.....", updatedMess);
      res.status(200).json(updatedMess);
    } else {
      return createError(403, "You can update only your mess!");
    }
  } catch (err) {
    return err;
  }
};

export const deleteMess = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    if (!mess) return createError(404, "Mess not found!");
    if (req?.user?.id === mess?.userId) {
      await Mess.findByIdAndDelete(req?.user?.id);
      res.status(200).json("The Mess has been deleted");
    } else {
      return createError(403, "You can delete only your Mess!");
    }
  } catch (err) {
    return err;
  }
};

export const getMess = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    if (!mess) return createError(404, "Mess not found!");
    res.status(200).json(mess);
  } catch (err) {
    return err;
  }
};

export const addPlan = async (req, res) => {
  const mess = await Mess.findOne({ userId: req?.user?.id });
  const newPlan = new Plan({
    userId: req?.user?.id,
    messId: mess?.id,
    ...req?.body,
  });
  try {
    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (err) {
    return err;
  }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req?.params?.id);
    if (!plan) return createError(404, "Plan not found!");
    if (req?.user?.id === plan?.userId) {
      const updatedPlan = await Plan.findByIdAndUpdate(
        req?.params?.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPlan);
    } else {
      return createError(403, "You can update only your Plan!");
    }
  } catch (err) {
    return err;
  }
};

export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return createError(404, "Plan not found!");
    if (req.user.id === plan.userId) {
      await Plan.findByIdAndDelete(req.params.id);
      res.status(200).json("The Plan has been deleted");
    } else {
      return createError(403, "You can delete only your Plan!");
    }
  } catch (err) {
    return err;
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req?.user?.id });
    if (!plans) {
      res.status(401).send({ message: "No Plan is there to display!!" });
    } else {
      res.status(200).json(plans);
    }
  } catch (err) {
    return err.message;
  }
};
