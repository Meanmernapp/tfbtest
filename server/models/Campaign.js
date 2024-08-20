import mongoose from "mongoose";
const { Schema } = mongoose;

const campaignSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["music", "video", "city", "image"],
    },
    start_date: {
      type: Date,
      required: false,
    },
    end_date: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    created_by: {
      type: String,
      required: true,
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media",
      },
    ],
    userVotes: [
      {
        user_id: {
          type: String,
          ref: "User",
        },
        voted_on: {
          type: Date,
        },
        media_id: {
          type: String,
          ref: "Media",
        },
      },
    ],
    total_votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add an Option to the campaign object
campaignSchema.statics.addMediaToCampaign = async function (
  campaignID,
  mediaID
) {
  await this.findByIdAndUpdate(campaignID, { $push: { options: mediaID } });
};

campaignSchema.statics.removeMediaFromCampaign = async function (
  campaignID,
  mediaID
) {
  await this.findByIdAndUpdate(campaignID, { $pull: { options: mediaID } });
};

// add an Option to the campaign object
campaignSchema.statics.addUserVoteToCampaign = async function (
  campaignID,
  userID,
  mediaID
) {
  await this.findByIdAndUpdate(campaignID, {
    $push: {
      userVotes: {
        user_id: userID,
        voted_on: Date.now(),
        media_id: mediaID,
      },
    },
  });
};

// get list of votes on this campaign
campaignSchema.statics.canUserVote = async function (campaignID, userID) {
  const result = await this.findById(campaignID).select("userVotes -_id");
  var canVote = true;

  result?.userVotes.forEach((vote) => {
    if (vote?.user_id === userID) {
      canVote = false;
    }
  });

  return canVote;
};

export default mongoose.model("Campaigns", campaignSchema);
