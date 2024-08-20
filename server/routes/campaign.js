import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaignByName,
  getSongs,
  getCampaign,
  getNewestCampaign,
  updateCampaign,
  deleteCampaign,
} from "../controller/campaign.js";
import authenticateToken from "../lib/authentication.js";

const router = express.Router();


router.post("/create", authenticateToken, createCampaign);
router.get("/getCampaigns", getCampaigns);
router.get("/getCampaignByName/:name", getCampaignByName);
router.get("/getSongs/:campaignId", getSongs);
router.get("/getCampaign/:id", getCampaign);
router.get("/getNewestCampaign", getNewestCampaign);
router.put("/updateCampaign/:id", authenticateToken,updateCampaign);
router.delete("/deleteCampaign/:id", deleteCampaign);

export default router;
