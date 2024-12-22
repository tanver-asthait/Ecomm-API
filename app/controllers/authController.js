import UsersModel from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import { EncodeToken } from "./../utility/tokenUtility.js";

export const registration = async (req, res) => {
  try {
    const { firstName, lastName, phone, nidNumber, password } = req.body;

    const user = await UsersModel.findOne({ phone: phone });

    if (user) {
      return res.json({
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const newUser = await UsersModel.create({
      firstName,
      lastName,
      phone,
      nidNumber,
      password: hashPassword,
    });

    res.json({
      message: "User created Successfully.",
    });
  } catch (e) {
    res.json({ message: e.message ? e.message : "Registration error" });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await UsersModel.findOne({ phone: phone });
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.json({
        message: "Invalid password",
      });
    }
    let token = EncodeToken(user.phone, user._id);
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };
    res.cookie("token", token, cookieOption);
    res.json({
      token,
      message: "Login Successfully.",
    });
  } catch (e) {
    res.json({ message: e.message ? e.message : "Authorization error" });
  }
};
