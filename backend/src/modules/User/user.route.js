import express from 'express';
import { UserControllers } from './user.controller.js';

const router = express.Router();

router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;