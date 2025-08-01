import express from "express"
import protect from "../middleWare/authMiddleware.js";
import contactUs from "../controllers/contactController.js";
const router = express.Router();

router.post('/', protect, contactUs);
export default router