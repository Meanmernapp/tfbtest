// use multer for handling file upload
// https://www.youtube.com/watch?v=EVOFt8Its6I
// no need to use 'dest' in multer because that keeps the file locally
// https://stackoverflow.com/questions/69921812/multer-file-buffer-missing
// https://medium.com/@saranyasasikumar06/mastering-file-uploads-to-amazon-s3-in-your-node-js-b068fa3cbadf
// mediaRoutes.js
import express from "express";
import multer from "multer";
import { writeToS3 } from "../lib/s3.js";

import {
  addMedia,
  getMediaById,
  getAllMedia,
  getMediaList,
  updateMedia,
  vote,
  deleteMedia,
  deleteAllMedia,
  addMediaCities
} from "../controller/media.js";

import authenticateToken from "../lib/authentication.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB in bytes
  }, // maxSize in bytes
});

router.post("/addMedia", authenticateToken, upload.single("file"), addMedia);
router.post("/addMediaCities", authenticateToken,  addMediaCities);
router.get("/getMedia/:id", getMediaById);
router.get("/getAllMedia", getAllMedia);
router.get("/getMediaList", getMediaList);
router.put("/updateMedia/:id", updateMedia);
router.put("/vote", vote);
router.post("/deletemedia", deleteMedia);
router.post("/deleteallmedia", deleteAllMedia);

export default router;
