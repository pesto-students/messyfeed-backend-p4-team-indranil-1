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
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    photos: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mess", messSchema);
