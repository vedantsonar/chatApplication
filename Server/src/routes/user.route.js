import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { fetchUser } from "../middlewares/fetchUser.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "dp",
      maxCount: 1,
    }
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(fetchUser, logoutUser);

export default router;
