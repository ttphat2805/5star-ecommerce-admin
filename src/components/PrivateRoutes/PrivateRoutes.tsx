import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
    // check user login
    // run localStorage.setItem('access_token', 'abcdef') in Console Browser to set user login
    const IsLoggedIn = Boolean(localStorage.getItem('access_token'));
    return IsLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
