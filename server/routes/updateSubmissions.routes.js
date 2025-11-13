import express from 'express';
import { fetchSubmissions } from '../controllers/updateSubmissions.controller.js';
import { updateSubmissions } from '../controllers/updateSubmissions.controller.js';

const router = express.Router();

router.get('/updateSubmissions', fetchSubmissions);
router.post('/updateSubmissions', updateSubmissions);

export default router;
