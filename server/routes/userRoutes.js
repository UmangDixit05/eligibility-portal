import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/rolesMiddleware.js";

const router = express.Router();

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

router.get("/student", verifyToken, authorizeRoles("admin", "student"), (req, res) => {
    res.json({ message: "Welcome Student" });
});

export default router;
