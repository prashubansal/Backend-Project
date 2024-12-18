import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 

const router = Router()

//as soon as user comes to this page and if it has "/register" in his request, redirect it to "user.controller.js"
router.route("/register").post(
    upload.fields([
        {
            name: "avatar", //frontend should have the same name
            maxCount: 1
        },
        {
            name: "coverImage", //frontend should have the same name
            maxCount: 1
        }
    ]), 
    registerUser
)

export default router