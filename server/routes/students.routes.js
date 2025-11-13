import  express  from 'express';
import { getStudentsByDivision } from '../controllers/students.controller.js';
import { createStudent } from '../controllers/students.controller.js';
import { deleteStudent } from '../controllers/students.controller.js';

const router = express.Router();

router.get('/students', getStudentsByDivision);
router.post('/students', createStudent);
router.delete('/students/:studentId', deleteStudent);

export default router;