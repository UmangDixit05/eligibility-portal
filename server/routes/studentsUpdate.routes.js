import express from 'express';
import { getStudent } from '../controllers/studentsUpdate.controller.js';
import { updateStudent } from '../controllers/studentsUpdate.controller.js';

const router = express.Router();

router.get('/studentsUpdate', getStudent);
router.put('/studentsUpdate', updateStudent);

export default router;