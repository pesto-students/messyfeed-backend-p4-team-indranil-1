import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: [
        "sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      default: "Sunday",
    },
    mealType: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      default: [],
    },
    messId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
