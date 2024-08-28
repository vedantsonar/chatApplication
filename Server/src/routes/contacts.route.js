import { Router } from "express";
import { fetchUser } from "../middlewares/fetchUser.middleware.js";
import { getUserForSidebar } from "../controllers/contacts.controller.js";

const router = Router()

router.route("/").get(fetchUser, getUserForSidebar)

export default router