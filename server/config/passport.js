import dotenv from "dotenv";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { validatePassword } from "../lib/password.js";
import User from "../models/User.js";
dotenv.config();
const cookieExtractor = (req) => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies["accessToken"];
  }
  return jwt;
};

const jwtOptions = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const passportConfig = new JwtStrategy(jwtOptions, (payload, done) => {
  const currentTimestamp = Date.now();

  if (currentTimestamp > payload.expiration) {
    return done(new Error("Unauthorized"), false);
  }

  User.findById(payload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, false);
    });
});

export default passportConfig;
