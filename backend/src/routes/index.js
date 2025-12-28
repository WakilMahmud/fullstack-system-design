import { Router } from 'express';
import { UserRoutes, UserRoutesMeta } from '../modules/User/user.route.js';

const router = Router();

export const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
        absoluteSourcePath: UserRoutesMeta.absoluteSourcePath,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;