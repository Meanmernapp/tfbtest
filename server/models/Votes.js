import mongoose from "mongoose";
const { Schema } = mongoose;

const votesSchema = new mongoose.Schema(
  {
    city: {
      type: String,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
    },
    campaign_id: {
      type: Schema.Types.ObjectId,
      ref: "Campaigns",
    },
    media_id: {
      type: Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Votes", votesSchema);
