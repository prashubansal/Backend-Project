import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

//as soon as user comes to this page and if it has "/register" in his request, redirect it to "user.controller.js"
router.route("/register").post(registerUser)

export default router