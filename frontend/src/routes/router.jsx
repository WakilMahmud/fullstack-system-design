import { Outlet, createBrowserRouter, redirect } from 'react-router';
import paths, { rootPaths } from './paths';
import { Suspense, lazy } from 'react';
import LinearLoader from '../components/loading/LinearLoader';
import Progress from '../components/loading/Progress';

const App = lazy(() => import('../App'));
const MainLayout = lazy(() => import('../layouts/main-layout'));
const AuthLayout = lazy(() => import('../layouts/auth-layout'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Login = lazy(() => import('../pages/authentication/Login'));
const Signup = lazy(() => import('../pages/authentication/Signup'));
const ErrorPage = lazy(() => import('../pages/errors/ErrorPage'));

export const routes = [
    {
        element: (
            <Suspense fallback={<Progress />}>
                <App />
            </Suspense>
        ),
        children: [
            {
                path: rootPaths.root,
                element: (
                    <MainLayout>
                        <Suspense fallback={<LinearLoader />}>
                            <Outlet />
                        </Suspense>
                    </MainLayout>
                ),
                children: [
                    {
                        index: true,
                        loader: () => redirect("/dashboard")
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                ],
            },
            {
                path: rootPaths.authRoot,
                element: <AuthLayout />,
                children: [
                    {
                        path: paths.login,
                        element: <Login />,
                    },
                    {
                        path: paths.signup,
                        element: <Signup />,
                    },
                ],
            },
            {
                path: '*',
                element: <ErrorPage />,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;