import { Router } from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import { fetchUser } from "../middlewares/fetchUser.middleware.js";

const router = Router()

router.route("/send-msg/:receiverId").post(fetchUser, sendMessage)

router.route("/get-msg/:userToChatId").get(fetchUser, getMessage)


export default router