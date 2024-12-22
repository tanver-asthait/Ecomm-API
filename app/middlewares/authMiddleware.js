import { DecodeToken } from "./../utility/tokenUtility.js";

export const authGuard = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    token = req.cookies["authorization"];
  }

  let decoded = DecodeToken(token);

  if (decoded === null) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  } else {
    let phone = decoded["phone"];
    let user_id = decoded["user_id"];
    req.headers.phone = phone;
    req.headers.user_id = user_id;
    next();
  }
};
