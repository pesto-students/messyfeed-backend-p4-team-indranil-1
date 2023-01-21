import Customer from "../models/Customer.js";
import Mess from "../models/Mess.js";
import Attendance from "../models/Attendance.js";
import { sendMail } from "./sendMail.js";

//Add Customer
export const addCustomer = async (req, res) => {
  try {
    const mess = await Mess.findOne({ userId: req?.user?.id });
    if (!mess)
      res.status(200).json({
        statusCode: 201,
        message:
          "You cannot add customer without adding your Mess details first",
      });
    if (Customer?.findOne({ email: req?.body?.email }))
      res.status(200).json({
        statusCode: 201,
        message: "Email id already exists",
      });
    if (Customer?.findOne({ phoneNo: req?.body?.phoneNo }))
      res.status(200).json({
        statusCode: 201,
        message: "Phone number already exists",
      });
    const newCustomer = new Customer({
      userId: req.user.id,
      messId: mess?.id,
      ...req.body,
    });
    const savedCustomer = await newCustomer.save();
    console.log(savedCustomer);
    if (!savedCustomer)
      res.status(200).json({
        statusCode: 201,
        message: "Please check the details you enter",
      });
    res.status(200).json({ statusCode: 200, message: savedCustomer });
  } catch (err) {
    console.log(err);
    return err;
  }
};

//Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer?.findById(req?.params?.id);
    if (!customer)
      res.status(200).json({
        statusCode: 201,
        message: "Customer is not available",
      });
    if (req?.user?.id === customer?.userId) {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        req?.params?.id,
        {
          $set: req?.body,
        },
        { new: true }
      );
      if (!updatedCustomer)
        res.status(200).json({
          statusCode: 201,
          message: "Please check the details you enter",
        });
      res.status(200).json({ statusCode: 200, message: updatedCustomer });
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You can update only your customer details!",
      });
    }
  } catch (err) {
    return err;
  }
};

//Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req?.params?.id);
    if (!customer)
      res.status(200).json({
        statusCode: 201,
        message: "Customer is not available",
      });
    if (req?.user?.id === customer?.userId) {
      await Customer.findByIdAndDelete(req?.params?.id);
      res
        .status(200)
        .json({ statusCode: 200, message: "The Customer has been deleted" });
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You can delete only your Customer!",
      });
    }
  } catch (err) {
    return err;
  }
};

//Get a Customer
export const getCustomer = async (req, res) => {
  try {
    let customer = await Customer.findOne({ email: req?.params?.id });
    if (!customer) customer = await Customer.findById(req?.params?.id);
    if (!customer)
      res.status(200).json({
        statusCode: 201,
        message: "Customer is not available",
      });
    res.status(200).json({
      statusCode: 200,
      message: customer,
    });
  } catch (err) {
    return err;
  }
};

//Get all customers under a mess
export const allCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req?.user?.id });
    if (!customers)
      res.status(200).json({
        statusCode: 201,
        message:
          "No customer is there to display, pleasse add customer details",
      });
    res.status(200).json({
      statusCode: 200,
      message: customers,
    });
  } catch (err) {
    return err;
  }
};

export const sendOtp = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      $and: [{ email: req?.body?.email }, { userId: req?.user?.id }],
    });
    if (!customer)
      res.status(200).json({
        statusCode: 201,
        message: "Please enter valid email id!",
      });
    else if (
      new Date(customer?.planEndDate) < new Date() ||
      customer.mealsLeft < 0
    ) {
      res.status(200).json({
        statusCode: 201,
        message: "No plan is active",
      });
    } else if (req?.user?.id === customer?.userId) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      await Customer.findByIdAndUpdate(
        customer?.id,
        {
          otp: otp,
        },
        { new: true }
      );
      const result = sendMail(
        // `otp=${otp}, email=${req?.body?.email}, name=${customer?.name}`
        `${otp}`
      );
      res.status(200).json({
        statusCode: 200,
        message: "OTP sent through e-mail",
      });
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You are not authorised to send OTP to this customer!",
      });
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const validateOtp = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      $and: [{ email: req?.body?.email }, { userId: req?.user?.id }],
    });
    if (!customer)
      res.status(200).json({
        statusCode: 201,
        message: "Please enter valid email id!",
      });
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
        res.status(200).json({
          statusCode: 200,
          message: "OTP is verified",
        });
      } else {
        res.status(200).json({
          statusCode: 201,
          message: "Invalid OTP",
        });
      }
    } else {
      res.status(200).json({
        statusCode: 201,
        message: "You are not authorised to access this customer!",
      });
    }
  } catch (err) {
    return err;
  }
};
