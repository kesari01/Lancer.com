import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    gigId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);
