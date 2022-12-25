import Mess from "../models/Mess.js";
import Customer from "../models/Customer.js";
import Plan from "../models/Plan.js";
import Attendance from "../models/Attendance.js";
import { createError } from "../error.js";

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

export const addCustomer = async (req, res, next) => {
  const newCustomer = new Customer({ userId: req.user.id, ...req.body });
  try {
    const savedCustomer = await newCustomer.save();
    res.status(200).json(savedCustomer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return next(createError(404, "Customer not found!"));
    if (req.user.id === customer.userId) {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCustomer);
    } else {
      return next(createError(403, "You can update only your customer!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return next(createError(404, "Customer not found!"));
    if (req.user.id === customer.userId) {
      await Customer.findByIdAndDelete(req.params.id);
      res.status(200).json("The Customer has been deleted");
    } else {
      return next(createError(403, "You can delete only your Customer!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return next(createError(404, "Customer not found!"));
    res.status(200).json(Customer);
  } catch (err) {
    next(err);
  }
};

export const allCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ userId: req.params.id });
    if (!customers)
      return next(createError(404, "No customer is there to display!"));
    res.status(200).json(customers);
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
    const plans = await Plan.find({ userId: req.params.id });
    if (!plans) return next(createError(404, "No Plan is there to display!"));
    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const customer = Customer.find({ email: req.params.email });
    if (!customer) return next(createError(404, "Email doesn't exists!"));
    if (req.user.id === customer.userId) {
      const otp = 123456;
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customer.id,
        {
          otp: otp,
        },
        { new: true }
      );
      res.status(200).json(updatedCustomer);
    } else {
      return next(createError(403, "You can update only your customer!"));
    }
  } catch (err) {
    next(err);
  }
};

export const validateOtp = async (req, res, next) => {
  try {
    const customer = Customer.find({ email: req.params.email });
    if (!customer) return next(createError(404, "Email doesn't exists!"));
    if (req.user.id === customer.userId) {
      if (req.params.otp === customer.otp) {
        const updatedCustomer = await Customer.findByIdAndUpdate(
          customer.id,
          {
            otp: null,
            $inc: { mealsLeft: -1 },
          },
          { new: true }
        );
        const newEntry = new Attendance({
          userId: req.user.id,
          messId: customer.messId,
          custId: customer.id,
          ...req.body,
        });
        await newEntry.save();
        res.status(200).json(updatedCustomer);
      } else {
        return next(createError(403, "Invalid OTP"));
      }
    } else {
      return next(createError(403, "You can update only your customer!"));
    }
  } catch (err) {
    next(err);
  }
};
