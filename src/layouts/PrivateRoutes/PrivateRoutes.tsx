import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
    const IsLoggedIn = Boolean(localStorage.getItem('access_token'));
    return IsLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
