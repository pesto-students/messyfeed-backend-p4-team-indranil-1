import Customer from "../models/Customer.js";
import Attendance from "../models/Attendance.js";
import { createError } from "../error.js";

//Add Customer
export const addCustomer = async (req, res, next) => {
  const newCustomer = new Customer({ userId: req.user.id, ...req.body });
  try {
    const savedCustomer = await newCustomer.save();
    res.status(200).json(savedCustomer);
  } catch (err) {
    next(err);
  }
};

//Update Customer
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

//Delete Customer
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

//Get a Customer
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return next(createError(404, "Customer not found!"));
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

//Get all customers under a mess
export const allCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findOne({ userId: req.user.id });
    if (!customers)
      return next(createError(404, "No customer is there to display!"));
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer)
      return next(createError(404, "Please enter valid email id!"));
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
      return next(
        createError(403, "You are not authorised to send OTP to this customer!")
      );
    }
  } catch (err) {
    next(err);
  }
};

export const validateOtp = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer)
      return next(createError(404, "Please enter valid email id!"));
    if (req.user.id === customer.userId) {
      if (customer.otp && req.body.otp === customer.otp) {
        const updatedCustomer = await Customer.findByIdAndUpdate(
          customer.id,
          {
            otp: 0,
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
      return next(
        createError(403, "You are not authorised to access this customer!")
      );
    }
  } catch (err) {
    next(err);
  }
};
