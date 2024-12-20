import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
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
// can be handled thorugh "get" request
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/user-details").post(verifyJWT, getCurrentUser)
router.route("/update-account").post(verifyJWT, updateAccountDetails)
router.route("/update-avatar").post(
    upload.fields(
        {
            name: "avatar",
            maxCount: 1
        }
    ),
    verifyJWT,
    updateUserAvatar
)
router.route("/update-coverImage").post(
    upload.fields(
        {
            name: "coverImage",
            maxCount: 1
        }
    ),
    verifyJWT,
    updateUserCoverImage
)


export default router