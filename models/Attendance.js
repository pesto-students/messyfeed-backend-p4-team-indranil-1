import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    mealType: {
      type: String,
      required: true,
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

export default mongoose.model("Attendance", attendanceSchema);
