import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { fetchUser } from "../middlewares/fetchUser.middleware.js";

const router = Router()

router.route("/send-msg/:receiverId").post(fetchUser, sendMessage)

export default router