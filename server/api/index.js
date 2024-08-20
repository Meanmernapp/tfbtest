import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import routes from "../routes/index.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import allowedOrigins from "../config/allowedOrigins.js";
import passportConfig from "../config/passport.js";

//Configurations
const app = express();
dotenv.config();
//Middleware
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ["https://www.tfbtest.com","https://tfbtest.com","https://russworld-client.vercel.app", "http://localhost:5173"], // Whitelist the domains you want to allow
};
console.log(process.env.MONGO_URL)
app.use(cors(corsOptions)); // Use the cors middleware with your options

app.use(cookieParser(process.env.SECRET));

app.use(passport.initialize());
passport.use(passportConfig);

//Router
app.use("/api", routes);

//Database, server setup
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection has been established", process.env.NODE_ENV, 'PRODUCTION');
    const PORT = process.env.PORT || 6001;
    app.listen(PORT, () => {
      console.log(`App is listeting on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });

//Error handler
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ error: true, errorMessage: "File is too big" });
  }
  res.status(400).json({ error: true, errorMessage: err.message });
});
export default app;
