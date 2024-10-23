import UserController from "../controllers/user.controller.js"
import express from "express"
import authUser from "../middleware/authUser.js"

const router = express.Router()

router.post("/register",UserController.register);
router.post("/login", UserController.login);
router.post("/logout", authUser.isAuthenticated , UserController.logout);
router.get("/profile", authUser.isAuthenticated, UserController.getUserProfile);
router.get("/admins", UserController.getAllAdmins)

export default router;