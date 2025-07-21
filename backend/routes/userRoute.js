import { Router } from "express";
import { loginUser, registerUser,logout, getUser, loginStatus} from "../controllers/userController.js";
import authMiddleware from "../middleWare/authMiddleware.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser",authMiddleware, getUser);
router.get("/loginStatus", loginStatus);
export default router;
  