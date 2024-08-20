// controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generatePassword, validatePassword } from "../lib/password.js";
import sendMagicLink from "../lib/email.js";
import validator from "validator";
import { config } from "dotenv";
config();

export const magicAuth = async (req, res) => {
  const { email } = req.body;

  // Validate the email
  if (!validator.isEmail(email)) {
    return res.json({ ok: false, message: "Invalid email provided" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email: email });

    if (!user) {
      // If user doesn't exist, create a new user
      user = await User.create({ email });

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "20m",
      });

      // Send magic link to email for signup
      const mailsend = await sendMagicLink(email, token, "signup");

      return res.send({
        ok: true,
        message:
          "Your account has been created. Click the link in the email to verify 👻",
        mailsend,
      });
    }

    // If user exists, generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });

    // Send magic link to email for signin
    const mailsend = await sendMagicLink(email, token, "signin");

    return res.send({
      ok: true,
      message: "Link sent to your email for sign in",
      mailsend,
    });
  } catch (error) {
    return res.json({ error: true, errorMessage: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user.id, expiration: Date.now() + parseInt(60 * 60 * 1000) },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    const user = await User.findById(req.user.id);
    return res.status(200).json({
      error: false,
      isAuthenticated: true,
      reqUserId: req.user.id,
      data: user,
      token,
    });
  } catch (error) {
    return res.json({ error: true, errorMessage: error.message });
  }
};

export const logOut = (req, res) => {
  try {
    return res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: true, errorMessage: error.message });
  }
};

// Add other controller functions...
export const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: true, errorMessage: "User not found" });
    }
    return res
      .status(200)
      .json({ data: updatedUser, message: "Your Profile has been updated" });
  } catch (error) {
    return res.status(500).json({ error: true, errorMessage: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, { password: 0 });
    return res.status(200).json({
      error: false,
      isAuthenticated: true,
      reqUserId: user.id,
      data: user,
    });
  } catch (error) {
    return res.json({ error: true, errorMessage: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) {
      return res
        .status(403)
        .json({ error: true, errorMessage: "Refresh token not found" });
    }

    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(403)
        .json({ error: true, errorMessage: "Invalid refresh token" });
    }

    // Generate new access token
    const token = jwt.sign(
      { id: user._id, expiration: Date.now() + parseInt(60 * 60 * 1000) },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("accessToken", token, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
    });

    res.status(200).json({ message: "Access token refreshed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(403).json({ error: true, errorMessage: error.message });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: true, errorMessage: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: true, errorMessage: error.message });
  }
};
export const adminAccess = async (req, res) => {
  try {
    const { email, type } = req.body;
    const adminId = req.user.id;
    if (!email || !type) {
      return res.status(400).json({
        status: "error",
        error: "Missing fields, provide email and type",
      });
    }
    const admin = await User.findById(adminId, "type");
    if (!admin || admin.type !== "admin") {
      return res.status(400).json({
        status: "error",
        error: "You do not have access to make edits",
      });
    }

    if (!(type === "admin" || type === "general")) {
      return res
        .status(401)
        .json({ status: "error", error: "Invalid user type" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { type },
      { new: true, fields: { email: 1, type: 1 } }
    );
    if (!user) {
      return res.status(400).json({ status: "error", error: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: `${user.email} now has ${type} access`,
    });
  } catch (error) {
    console.error("/adminAccess: Error", error);
    return res.status(500).json({ error: true, errorMessage: error.message });
  }
};

export const isCheck = async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  // const token = jwt.verify(req.query.token, process.env.JWT_SECRET);
  return res.status(200).json({ user });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isValid = await validatePassword(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, expiration: Date.now() + parseInt(60 * 60 * 1000) },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged in successfully", token, user });
  } catch (error) {
    res.status(500).json({ error: true, errorMessage: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: true, errorMessage: "Email is already taken" });
    }

    const hashedPassword = await generatePassword(password);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, expiration: Date.now() + parseInt(60 * 60 * 1000) },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .json({ message: "Created successfully", token, user: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: true, errorMessage: error.message });
  }
};
export const isAuthorized = async (req, res) => {
  const userId = req.params.id;
  const token = req.cookies["accessToken"];

  if (!token) {
    return res.status(403).json({ error: true, errorMessage: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.id === userId) {
      return res
        .status(200)
        .json({ error: false, isAuthenticated: true, isAuthorized: true });
    } else {
      return res
        .status(403)
        .json({ error: true, errorMessage: "Unauthorized" });
    }
  } catch (error) {
    return res.status(403).json({ error: true, errorMessage: error.message });
  }
};
