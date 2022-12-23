import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mealCount: {
      type: Number,
    },
    planCost: {
      type: Number,
    },
    messId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
