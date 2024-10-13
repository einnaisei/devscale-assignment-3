import { Router } from "express";
import { register, login } from "../controllers/authController"; // Ensure this path is correct

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
