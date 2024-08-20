import express from "express";
import passport from "passport";
import {
  getUserProfile,
  isAuthenticated,
  isAuthorized,
  logOut,
  login,
  refreshToken,
  signUp,
  updateUserProfile,
  magicAuth,
  verifyToken,
  isCheck,
  adminAccess,
} from "../controller/user.js";

import authenticateToken from "../lib/authentication.js";
import authenticate from "../lib/authenticate.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
//Logging in
router.post("/log-in", login);
//Signing up
router.post("/sign-up", signUp);
//Check if the user is authorized
router.get("/:id/isAuthorized", isAuthorized);
router.get("/check", isCheck);


// If the user is passowordless
router.post("/enter", magicAuth);
///verify that the user is authorized
router.get("/verify", authenticateToken, verifyToken);
//Logging out
router.get("/log-out", logOut);
// Update user information need
router.put("/profile/:id", updateUserProfile);
//Check if the request is authenticated
router.get("/isAuthenticated", authenticateToken, isAuthenticated);

//Get user information
router.get("/:id", getUserProfile);

router.post("/token", refreshToken);
router.post("/access", authenticateToken, adminAccess);

export default router;
