import Mess from "../models/Mess.js";
import Plan from "../models/Plan.js";
import Review from "../models/Review.js";
import { createError } from "../error.js";

export const addMess = async (req, res) => {
  const newMess = new Mess({ userId: req?.user?.id, ...req?.body });
  try {
    const savedMess = await newMess.save();
    if (!savedMess)
      res.status(200).json({
        statusCode: 201,
        message: "Please check the details you have entered",
      });
    res.status(200).json({
      statusCode: 200,
      message: savedMess,
    });
  } catch (err) {
    return err;
  }
};

export const updateMess = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    if (!mess)
      res.status(200).json({
        statusCode: 201,
        message: "Mess is not avilable",
      });
    if (req?.user?.id === mess?.userId) {
      const updatedMess = await Mess.findByIdAndUpdate(
        mess?.id,
        {
          $push: { photos: req?.body?.photos },
          $set: {
            address: req?.body?.address,
            pincode: req?.body?.pincode,
            name: req?.body?.name,
            email: req?.body?.email,
            contactNo: req?.body?.contactNo,
          },
        },
        { new: true }
      );
      res.status(200).json({
        statusCode: 200,
        message: updatedMess,
      });
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You can update only your mess!",
      });
    }
  } catch (err) {
    return err;
  }
};

export const deleteMess = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    if (!mess)
      res.status(200).json({
        statusCode: 201,
        message: "Mess is not available",
      });
    if (req?.user?.id === mess?.userId) {
      await Mess.findByIdAndDelete(req?.user?.id);
      res.status(200).json({
        statusCode: 200,
        message: "The Mess has been deleted",
      });
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You can delete only your mess!",
      });
    }
  } catch (err) {
    return err;
  }
};

export const getMess = async (req, res) => {
  try {
    const mess = await Mess.findById(req?.params?.id);
    if (!mess)
      res.status(200).json({
        statusCode: 201,
        message: "Mess is not available",
      });
    res.status(200).json(mess);
  } catch (err) {
    return err;
  }
};

export const getMessWithToken = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    if (!mess)
      res.status(200).json({
        statusCode: 201,
        message: "Mess not found!",
      });
    res.status(200).json({
      statusCode: 200,
      message: mess,
    });
  } catch (err) {
    return err;
  }
};

export const addPlan = async (req, res) => {
  const mess = await Mess.findOne({ userId: req?.user?.id });
  if (!mess)
    res.status(200).json({
      statusCode: 201,
      message: "Please register a mess to add plans",
    });
  const newPlan = new Plan({
    userId: req?.user?.id,
    messId: mess?.id,
    ...req?.body,
  });
  try {
    const savedPlan = await newPlan.save();
    res.status(200).json({
      statusCode: 200,
      message: savedPlan,
    });
  } catch (err) {
    return err;
  }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req?.params?.id);
    if (!plan)
      res.status(200).json({
        statusCode: 201,
        message: "Plan not found!",
      });
    if (req?.user?.id === plan?.userId) {
      const updatedPlan = await Plan.findByIdAndUpdate(
        req?.params?.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        statusCode: 200,
        message: updatedPlan,
      });
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You can update only your Plan!",
      });
    }
  } catch (err) {
    return err;
  }
};

export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req?.params?.id);
    if (!plan)
      res.status(200).json({
        statusCode: 201,
        message: "Plan not found!",
      });
    if (req?.user?.id === plan?.userId) {
      await Plan.findByIdAndDelete(req.params.id);
      res.status(200).json({
        statusCode: 200,
        message: "The Plan has been deleted",
      });
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You can delete only your Plan!",
      });
    }
  } catch (err) {
    return err;
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req?.user?.id });
    if (!plans)
      res.res.status(200).json({
        statusCode: 201,
        message: "No Plan is there to display!",
      });

    res.status(200).json({
      statusCode: 200,
      message: plans,
    });
  } catch (err) {
    return err;
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

export const getReviewsWithToken = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    const reviews = await Review.find({ messId: mess?.id });
    if (!reviews)
      res
        .status(200)
        .json({ statusCode: 201, message: "No reviews are there to show" });
    res.status(200).json({ statusCode: 200, message: reviews });
  } catch (err) {
    return err;
  }
};
