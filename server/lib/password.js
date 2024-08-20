import bcrypt from "bcrypt";
import crypto from "crypto";
function generateRandomString(length) {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=/g, "")
    .substring(0, length);
}

const generatePassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);
    return password;
  } catch (err) {
    throw err;
  }
};

const validatePassword = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (err) {
    throw err;
  }
};

export { generatePassword, validatePassword, generateRandomString };
