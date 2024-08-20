import campaignSchema from "../models/Campaign.js";
import userSchema from "../models/User.js";
import { sendAdminEmail } from "../lib/email.js";
import { ObjectId } from "mongodb";

export const createCampaign = async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.id, "type email _id");

    let params = {
      name: req.body.name,
      type: req.body.type,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      description: req.body.description,
      created_by: user.email,
    };

    const result = new campaignSchema(params);

    if (user.type !== "admin") {
      return res.status(403).json({
        status: "error",
        error: "User does not have access to create new event",
      });
    }

    await result.save();

    // const email_res = await sendAdminEmail();
    const email_res = "success";

    if (email_res === "error") {
      return res.status(400).json({
        status: "error",
        data: "Campaign successfully created, but email failed to send",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Your campaign was successfully created",
        data: result,
      });
    }
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};

// const campaigns = await campaignSchema
//   .find()
//   .select("-userVotes")
//   .sort({ createdAt: -1 });
export const getCampaigns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters or default to 1
    const limit = parseInt(req.query.limit) || 10; // Get the limit (number of documents per page) from the query parameters or default to 10

    // Calculate the skip value based on the page number and limit
    const skip = (page - 1) * limit;

    const campaigns = await campaignSchema.aggregate([
      {
        $project: {
          userVotes: 0, // Exclude the userVotes field
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort by createdAt field in descending order
        },
      },
      {
        $skip: skip, // Skip documents based on the skip value
      },
      {
        $limit: limit, // Limit the number of documents returned per page
      },
    ]);
    const count = await campaignSchema.count();
    return res
      .status(200)
      .json({ status: "success", data: campaigns, total: count });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};

export const getCampaignByName = async (req, res) => {
  try {
    const campaign_name = req.params.name;

    const campaign = await campaignSchema.find({ name: campaign_name });

    return res.status(200).json({ status: "success", data: campaign });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};

export const getSongs = async (req, res) => {
  try {
    const campaign_id = req.params.campaignId;
    const songs = await campaignSchema
      .findById(campaign_id)
      .populate("options")
      .exec();

    return res.status(200).json({ status: "success", data: songs });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};

export const getCampaign = async (req, res) => {
  try {
    const campaign_id = new ObjectId(req.params.id);
    const campaign = await campaignSchema
      .findById(campaign_id)
      .select("name options start_date end_date description type")
      .populate({ path: "options", options: { sort: { createdAt: -1 } } })
      .exec();
    // .sort({ _id: -1 })
    // .populate("options", "name created_by_name s3_url")
    // .exec();

    return res.status(200).json({ status: "success", data: campaign });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};

export const getNewestCampaign = async (req, res) => {
  try {
    const userId = req.query.user_id;

    const votes = await campaignSchema
      .findOne()
      .sort({ _id: -1 })
      .select("userVotes start_date end_date ")
      .exec();
    const userVotes = votes.userVotes;

    var current_date = new Date();
    var start = new Date(votes?.start_date);
    var end = new Date(votes?.end_date);
    if (current_date < start) {
      return res.status(200).json({
        status: "success",
        data: "Campaign not started",
        message: `This campaign will start on ${start.toDateString()}`,
      });
    } else if (current_date > end) {
      return res.status(200).json({
        status: "success",
        data: "Campaign finished",
        message: `This campaign is no longer active. Stay in touch by subscribing.`,
      });
    }

    if (userVotes.some((e) => e.user_id === userId)) {
      return res.status(200).json({
        status: "success",
        data: "User voted",
        message: `You have already voted for this campaign. We will notify you when a new campaign drops.`,
      });
    } else {
      const songs = await campaignSchema
        .findOne()
        .select("name options start_date end_date description type")
        .sort({ _id: -1 })
        .populate("options", "name created_by_name s3_url")
        .exec();
      return res.status(200).json({ status: "success", data: songs });
    }
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const campaign_id = req.params.id;
    let params = {
      name: req.body.name,
      type: req.body.type,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      description: req.body.description,
      options: req.body.options,
    };

    const user = await userSchema.findById(req.user.id, "type");

    if (user.type !== "admin") {
      return res.status(403).json({
        status: "error",
        error: "User does not have access to create new event",
      });
    }

    for (let prop in params) if (!params[prop]) delete params[prop];

    const campaign = await campaignSchema.findByIdAndUpdate(
      campaign_id,
      params,
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Your changes were successfully saved",
      data: campaign,
    });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign_id = req.params.id;

    const campaign = await campaignSchema.findByIdAndDelete(campaign_id);

    return res.status(200).json({
      status: "success",
      message: "The campaign was successfully deleted",
      data: campaign,
    });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err });
  }
};
