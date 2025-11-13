import express  from "express";
import { loginUser } from '../controllers/authcontroller.js';
import { AdminReg } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/AdminReg", AdminReg);

export default router;