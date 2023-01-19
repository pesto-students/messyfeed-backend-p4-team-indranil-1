import Customer from "../models/Customer.js";
import Mess from "../models/Mess.js";
import Attendance from "../models/Attendance.js";
import { createError } from "../error.js";
import { sendMail } from "./sendMail.js";

//Add Customer
export const addCustomer = async (req, res) => {
  const mess = await Mess.findOne({ userId: req?.user?.id });
  const newCustomer = new Customer({
    userId: req.user.id,
    messId: mess?.id,
    ...req.body,
  });
  try {
    const savedCustomer = await newCustomer.save();
    res.status(200).json(savedCustomer);
  } catch (err) {
    return err;
  }
};

//Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer?.findById(req?.params?.id);
    if (!customer) return createError(404, "Customer not found!");
    if (req?.user?.id === customer?.userId) {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        req?.params?.id,
        {
          $set: req?.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCustomer);
    } else {
      return createError(403, "You can update only your customer details!");
    }
  } catch (err) {
    return err;
  }
};

//Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return createError(404, "Customer not found!");
    if (req.user.id === customer.userId) {
      await Customer.findByIdAndDelete(req.params.id);
      res.status(200).json("The Customer has been deleted");
    } else {
      return createError(403, "You can delete only your Customer!");
    }
  } catch (err) {
    return err;
  }
};

//Get a Customer
export const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return createError(404, "Customer not found!");
    res.status(200).json(customer);
  } catch (err) {
    return err;
  }
};

//Get all customers under a mess
export const allCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req?.user?.id });
    if (!customers) return createError(404, "No customer is there to display!");
    res.status(200).json(customers);
  } catch (err) {
    return err;
  }
};

export const sendOtp = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      $and: [{ email: req?.body?.email }, { userId: req?.user?.id }],
    });
    if (!customer) return createError(404, "Please enter valid email id!");
    if (req?.user?.id === customer?.userId) {
      // const otp = 123456;
      const otp = Math.floor(100000 + Math.random() * 900000);
      //console.log(otp);
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customer?.id,
        {
          otp: otp,
        },
        { new: true }
      );
      // const mailBody = "OTP: " + otp;
      // const result = await sendMail(mailBody, req.body.email);
      // console.log("Result -- ", result);
      res.status(200).json(updatedCustomer);
      // res.status(200).json(otp);
    } else {
      return createError(
        403,
        "You are not authorised to send OTP to this customer!"
      );
    }
  } catch (err) {
    return err;
  }
};

export const validateOtp = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      $and: [{ email: req?.body?.email }, { userId: req?.user?.id }],
    });
    if (!customer) return createError(404, "Please enter valid email id!");
    if (req?.user?.id === customer?.userId) {
      if (customer?.otp && customer?.otp === parseInt(req?.body?.otp)) {
        await Customer.findByIdAndUpdate(
          customer?.id,
          {
            otp: 0,
            $inc: { mealsLeft: -1 },
          },
          { new: true }
        );
        const newEntry = new Attendance({
          userId: req?.user?.id,
          messId: customer?.messId,
          custId: customer?.id,
          ...req?.body,
        });
        await newEntry.save();
        res.status(200).json(newEntry);
      } else {
        return createError(403, "Invalid OTP");
      }
    } else {
      return createError(
        403,
        "You are not authorised to access this customer!"
      );
    }
  } catch (err) {
    return err;
  }
};
