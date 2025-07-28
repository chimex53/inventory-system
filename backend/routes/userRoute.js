import { Router } from "express";
import { loginUser, registerUser,logout, getUser, loginStatus,updateUser,changePassword,forgotPassword,resetPassword } from "../controllers/userController.js";
import protect from "../middleWare/authMiddleware.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/loginStatus", loginStatus);
router.patch("/updateUser", protect,updateUser);
router.patch("/changePassword", protect,changePassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);
export default router;
  