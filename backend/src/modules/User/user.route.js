import express from 'express';
import { UserControllers } from './user.controller.js';
import { fileURLToPath } from "url";

const router = express.Router();

export const UserRoutesMeta = {
    name: "Users",
    absoluteSourcePath: fileURLToPath(import.meta.url),
};

router.get('/all-students', UserControllers.getAllStudents);
router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;