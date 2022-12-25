import mongoose from "mongoose";

const messSchema = new mongoose.Schema(
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
    contactNo: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    pincode: {
      type: Number,
      required: true,
      default: 0,
    },
    photos: {
      type: [String],
      default: [],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mess", messSchema);
