import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Outlet />
        </div>
    );
};

export default AuthLayout;