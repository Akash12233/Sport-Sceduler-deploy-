import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    getCurrentUser, 
    updateAccountDetails
} from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/user.auth.js";


const router = Router()

router.route("/register").post(
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/currentuser").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

export default router