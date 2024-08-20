import campaign from "./campaign.js";
import mediaRoutes from "./media.js";
import analyticsRoutes from "./analytics.js";
import userRoutes from "./user.js";
import express from "express";
const router = express.Router();

router.use("/campaign", campaign);
router.use("/media", mediaRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/user", userRoutes);
export default router;
