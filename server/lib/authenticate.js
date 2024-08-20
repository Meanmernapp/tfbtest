import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const authenticate = (req, res, next) => {
  // Extract the token from the authorization header
  const token = req.cookies["accessToken"];
  console.log(token);

  // If no token is provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    console.log("user, cookie", user);
    // Set the user object in the request for future use
    req.user = user;
    next();
  });
};

export default authenticate;
