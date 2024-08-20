import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const authenticateToken = (req, res, next) => {
  // Get the authorization header value
  const authHeader = req.headers["authorization"];
  // Extract the token from the authorization header
  const token = authHeader && authHeader.split(" ")[1];
  // If no token is provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    // Set the user object in the request for future use
    req.user = user;
    next();
  });
};

export default authenticateToken;
