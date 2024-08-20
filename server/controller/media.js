// mediaController.js
import mediaSchema from "../models/Media.js";
import campaignSchema from "../models/Campaign.js";
import userSchema from "../models/User.js";
import voteSchema from "../models/Votes.js";
import { writeToS3 } from "../lib/s3.js";
import { sendUserEmail } from "../lib/email.js";
import { ObjectId } from "mongodb";
export const addMedia = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userSchema.findById(userId);
    const s3_url = await writeToS3(req.file);
    const params = {
      name: req.body.name,
      type: req.body.type,
      campaign_id: req.body.campaign_id,
      created_by_email: user.created_by_email,
      created_by_name: user.created_by_name,
      s3_url: s3_url,
    };

    const result = new mediaSchema(params);
    const media_result = await result.save();

    const campaign_id = new ObjectId(params.campaign_id.trim());
    await campaignSchema.addMediaToCampaign(campaign_id, media_result._id);

    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log(err, "error");
    res.status(401).json({ status: "error", error: err });
  }
};
export const addMediaCities = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userSchema.findById(userId);
    const { cities, type, campaign_id } = req.body;
    const created_by_email = user.created_by_email;
    const created_by_name = user.created_by_name;

    // Create an array of documents to insert
    const mediaDocs = cities.map((city) => ({
      name: city.name,
      type,
      campaign_id,
      created_by_email,
      created_by_name,
    }));

    // Insert the documents into the media collection
    const media_result = await mediaSchema.insertMany(mediaDocs);

    // Convert the campaign ID to ObjectId
    const campaignId = new ObjectId(campaign_id.trim());

    // Add each inserted media document to the campaign
    for (const media of media_result) {
      await campaignSchema.addMediaToCampaign(campaignId, media._id);
    }

    res.status(200).json({ status: "success", data: media_result });
  } catch (err) {
    console.log(err, "error");
    res.status(401).json({ status: "error", error: err });
  }
};


export const getMediaById = async (req, res) => {
  try {
    const media_id = req.params.id;
    const media_updated = await mediaSchema.findById(media_id);

    if (!media_updated) {
      return res
        .status(404)
        .json({ status: "error", data: "Media ID not found in DB." });
    } else {
      return res.status(200).json({ status: "success", data: media_updated });
    }
  } catch (err) {
    console.log(err, "error");
    return res.status(401).json({ status: "error", error: err });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const media_update = await mediaSchema.find({});
    res.status(200).json({ status: "success", data: media_update });
  } catch (err) {
    console.log(err, "error");
    res.status(401).json({ status: "error", error: err });
  }
};

export const getMediaList = async (req, res) => {
  const array = req.body.mediaArray;
  try {
    const media_update = await mediaSchema.find({ _id: { $in: array } });
    res.status(200).json({ status: "success", data: media_update });
  } catch (err) {
    console.log(err, "error");
    res.status(401).json({ status: "error", error: err });
  }
};

export const updateMedia = async (req, res) => {
  try {
    const media_id = req.params.id;
    let params = {
      name: req.body.name,
      campaign_id: req.body.campaign_id,
      s3_url: req.body.s3_url,
      created_by_email: req.body.created_by_email,
      created_by_name: req.body.created_by_name,
    };

    for (let prop in params) if (!params[prop]) delete params[prop];

    const campaign = await mediaSchema.findByIdAndUpdate(media_id, params, {
      new: true,
    });

    if (!campaign) {
      return res
        .status(404)
        .json({ status: "error", data: "Campaign ID not found in DB." });
    } else {
      return res.status(200).json({ status: "success", data: campaign });
    }
  } catch (err) {
    console.log(err, "error");
    return res.status(401).json({ status: "error", error: err });
  }
};

export const vote = async (req, res) => {
  try {
    const { song_id, user_id, campaign_id, user_city, user_age, user_gender } =
      req.body;

    if (!campaign_id || !song_id || !user_id) {
      console.log(
        "/vote: missing all or some variables: song_id, user_id, campaign_id"
      );
      res.status(400).json({
        status: "error",
        data: "Please pass in all variables: song_id, user_id, campaign_id",
      });
      return;
    }

    // verify that user can still vote
    const can_user_vote = await campaignSchema.canUserVote(
      campaign_id,
      user_id
    );
    if (!can_user_vote) {
      res
        .status(400)
        .json({ status: "error", data: "You have already voted." });
      return;
    }

    // update mediaSchema - increment total votes count ------------
    // $inc - tell mongoose to increase total votes by 1
    // set new: true, so that it returns the newly update value
    const media_update = await mediaSchema.findByIdAndUpdate(
      song_id,
      { $inc: { total_votes: 1 } },
      { new: true }
    );
    await campaignSchema.addUserVoteToCampaign(
      media_update.campaign_id,
      user_id,
      song_id
    );

    // similar to above, update Campaign schema
    const campaign_update = await campaignSchema.findByIdAndUpdate(
      media_update.campaign_id,
      { $inc: { total_votes: 1 } },
      { new: true }
    );

    // update userSchema - add to vote_history ---------------------
    // $push - append to array
    const user_update = await userSchema.findByIdAndUpdate(
      user_id,
      {
        $push: {
          vote_history: {
            song_id: song_id,
            voted_on: Date.now(),
            song_name: media_update.name,
          },
        },
      },
      { new: true }
    );

    // save to votes table
    const vote_instance = new voteSchema({
      city: user_city,
      age: user_age,
      gender: user_gender,
      campaign_id: campaign_id,
      media_id: song_id,
    });
    const vote_result = await vote_instance.save();
    if (!vote_result) {
      res
        .status(404)
        .json({ status: "error", data: "Error with creating a vote." });
      return;
    }

    if (!media_update) {
      res
        .status(404)
        .json({ status: "error", data: "Media ID not found in DB." });
      return;
    } else if (!user_update) {
      res
        .status(404)
        .json({ status: "error", data: "User ID not found in DB." });
      return;
    } else if (!campaign_update) {
      res
        .status(404)
        .json({ status: "error", data: "Campaign ID not found in DB." });
      return;
    } else {
      const result = await sendUserEmail(
        user_update.email,
        user_update.firstName,
        media_update.name
      );
      if (result === "error") {
        res.status(200).json({
          status: "success",
          data: "Successfully submitted vote, but email failed to send",
        });
        return;
      } else {
        res.status(200).json({ status: "success", data: { media_update } });
        return;
      }
    }
  } catch (err) {
    res.status(401).json({ status: "error", error: err });
  }
};
export const deleteMedia = async (req, res) => {
  try {
    const { mediaID, campaignID } = req.body;

    // 1. delete from media collection
    await mediaSchema.findByIdAndDelete(mediaID);
    // 2a. convert strings to Mongoose Object IDs
    const campaign_id = new ObjectId(campaignID);
    const media_id = new ObjectId(mediaID);
    // 2. delete from campaign collection (options array)
    await campaignSchema.removeMediaFromCampaign(campaign_id, media_id);

    return res
      .status(200)
      .json({ status: "success", message: "media deleted" });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};
export const deleteAllMedia = async (req, res) => {
  try {
    const media_updated = await mediaSchema.deleteMany();

    res.status(200).json({ status: "success", data: media_updated });
  } catch (err) {
    res.status(401).json({ status: "error", error: err });
  }
};
