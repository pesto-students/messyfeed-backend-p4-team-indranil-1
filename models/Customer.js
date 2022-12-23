import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    paymentMode: {
      type: String,
      default: "Cash",
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    mealsLeft: {
      type: Number,
      default: 0,
    },
    planStartDate: {
      type: Date,
    },
    planEndDate: {
      type: Date,
    },
    otp: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Inactive",
    },
    messId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
