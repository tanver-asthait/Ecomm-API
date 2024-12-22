import UsersModel from "../models/UsersModel.js";

export const getUser = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.params.id);
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (e) {
    res.json({ message: "No access" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.find();
    const userData = users.map((user) => {
      const { password, ...userInfo } = user._doc;
      return userInfo;
    });
    res.json(userData);
  } catch (error) {
    res.json({ message: error.message ? error.message : "Not found" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, nidNumber, bloodGroup } = req.body;
    const user = await UsersModel.findByIdAndUpdate(
      req.headers.user_id,
      {
        $set: {
          firstName,
          lastName,
          nidNumber,
          bloodGroup,
        },
      },
      { new: true }
    );
    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (e) {
    res.json({ message: "No access" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const user = await UsersModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    const { password, ...userData } = user._doc;
    res.json({
      message: "User deleted successfully",
    });
  } catch (e) {
    res.json({ message: "No access" });
  }
};
