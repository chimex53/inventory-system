import { Router } from "express";
import { loginUser, registerUser,logout} from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

export default router;
  