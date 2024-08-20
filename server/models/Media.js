import mongoose from "mongoose";
const { Schema } = mongoose;

const mediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    s3_url: {
      type: String,
      required: false,
    },
    total_votes: {
      type: Number,
      default: 0,
    },
    created_by_email: {
      type: String,
      required: false,
    },
    created_by_name: {
      type: String,
      required: false,
    },
    campaign_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Campaigns",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Media", mediaSchema);
