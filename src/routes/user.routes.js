import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 
import {verifyJWT} from "../middlewares/auth.middleware.js"

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

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)


export default router