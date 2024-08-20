import Votes from "../models/Votes.js";
import { ObjectId } from "mongodb";

export const getAllVotes = async (req, res) => {
  const { campaign_id } = req.body;

  try {
    const campaign = await Votes.find({ campaign_id: campaign_id });

    res.status(200).json({
      status: "success",
      total: campaign?.length,
      data: campaign,
    });
  } catch (err) {
    res.status(401).json({ status: "error", error: err });
  }
};

export const getVotes = async (req, res) => {
  try {
    var today = new Date();
    // define stages
    var match_stage = {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setDate(today.getDate() - 30)), //get the last 30 days
        },
      },
    };

    var group_stage = {
      $group: {
        _id: {
          $dateTrunc: { date: "$createdAt", unit: "day" },
        },
        count: { $sum: 1 },
      },
    };

    var sort_stage = {
      $sort: {
        _id: 1, // 1 sort asc., -1 sort desc.
      },
    };

    var project_stage = {
      $project: {
        date: "$_id",
        votes: "$count",
        _id: 0,
      },
    };

    var pipeline = [match_stage, group_stage, sort_stage, project_stage];
    var posts = await Votes.aggregate(pipeline);

    res
      .status(200)
      .json({ status: "success", count: posts.length, data: posts });
  } catch (err) {
    res.status(401).json({ status: "error", error: err });
  }
};

export const ageByDemo = async (req, res) => {
  const { campaignId, demo } = req.body;

  if (!validateDemo(demo)) {
    return res.status(401).json({
      status: "error",
      error: "enter a demo value: age, gender, or city",
    });
  }

  try {
    const campaignIdFormatted = new ObjectId(campaignId);
    const today = new Date();
    const sixtyDaysAgo = new Date(today.setDate(today.getDate() - 60));

    // Define stages
    const match_stage = {
      $match: {
        campaign_id: campaignIdFormatted,
        createdAt: {
          $gte: sixtyDaysAgo,
        },
      },
    };

    const group_stage = {
      $group: {
        _id: `$${demo}`,
        count: { $sum: 1 },
      },
    };

    const sort_stage = {
      $sort: {
        count: -1, // Sort by votes in descending order
      },
    };

    const limit_stage = {
      $limit: 50, // Limit the number of results to 50
    };

    const project_stage = {
      $project: {
        demographic: "$_id",
        votes: "$count",
        _id: 0,
      },
    };

    const pipeline = [
      match_stage,
      group_stage,
      sort_stage,
      limit_stage,
      project_stage,
    ];
    const posts = await Votes.aggregate(pipeline);

    return res.status(200).json({ status: "success", data: posts });
  } catch (err) {
    return res.status(401).json({ status: "error", error: err.message });
  }
};



function validateDemo(demo) {
  if (!demo) {
    return false;
  } else if (demo === "age" || demo === "gender" || demo === "city") {
    return true;
  } else {
    return false;
  }
}
