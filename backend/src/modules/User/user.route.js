import express from 'express';
import { UserControllers } from './user.controller.js';

const router = express.Router();

router.get('/all-students', UserControllers.getAllStudents);
router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;