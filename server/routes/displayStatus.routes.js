import express  from "express";
import { displayStatus, getStudentData }  from "../controllers/displayStatus.controller.js";

const router = express.Router();

router.get('/displayStatus', displayStatus);
router.get('/displayStudentData', getStudentData);

export default router;