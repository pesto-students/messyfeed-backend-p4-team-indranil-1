import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    messId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    custId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
