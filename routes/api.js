import express from "express";
const router = express.Router();
import * as profileController from "../app/controllers/profileController.js";
import * as authController from "../app/controllers/authController.js";
import { authGuard } from "../app/middlewares/authMiddleware.js";

router.post("/registration", authController.registration);
router.post("/login", authController.login);

router.get("/getUser/:id", authGuard, profileController.getUser);
router.get("/getAllUsers", authGuard, profileController.getAllUsers);
router.put("/updateUser", authGuard, profileController.updateProfile);
router.delete("/deleteUser/:id", authGuard, profileController.deleteProfile);

export default router;
