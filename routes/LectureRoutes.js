import express from 'express';
import { createLecture, getLectures } from './controllers/LectureController.js';

const router = express.Router();

router.post('/', createLecture);
router.get('/', getLectures);

export default router;
