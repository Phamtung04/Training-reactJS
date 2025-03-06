import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/users" replace/> : <Outlet/>;
}

export default AuthRoute