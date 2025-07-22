import { Router } from "express";
import { loginUser, registerUser,logout, getUser, loginStatus,updateUser} from "../controllers/userController.js";
import authMiddleware from "../middleWare/authMiddleware.js";
import protect from "../middleWare/authMiddleware.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/loginStatus", loginStatus);
router.patch("/updateUser", protect,updateUser);
export default router;
  