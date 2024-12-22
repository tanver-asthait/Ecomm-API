import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./../config/config.js";

export const EncodeToken = (phone, user_id) => {
  let KEY = JWT_SECRET;
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = { phone: phone, user_id: user_id };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const DecodeToken = (token) => {
  try {
    let KEY = JWT_SECRET;
    return jwt.verify(token, KEY);
  } catch (e) {
    return null;
  }
};
