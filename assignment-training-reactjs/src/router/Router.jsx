import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Authentication from '../pages/authentication/Authentication';
import Order from '../pages/user/Order';
import RegisterContainer from './../pages/authentication/register/RegisterContainer';
import LoginContainer from '../pages/authentication/login/LoginContainer';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import ForgotPasswordContainer from './../pages/forgotPassword/forgotPassword/ForgotPasswordContainer';
import PasswordCodeContainer from '../pages/forgotPassword/passwordCode/PasswordCodeContainer';
import ListUserContainer from '../pages/user/listUser/ListUserContainer';
import Layout from '../layouts/Layout';

const Router = () => {
  const element = useRoutes([
    {
      element: <AuthRoute />,
      children: [
        {
          element: <Authentication />,
          children: [
            { element: <LoginContainer />, index: true },
            { element: <LoginContainer />, path: 'login' },
            { element: <RegisterContainer />, path: 'register' },
            { element: <ForgotPasswordContainer/>, path: 'forgot-password' },
            { element: <PasswordCodeContainer />, path: 'password-code' },
          ],
        },
      ],
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { element: <ListUserContainer />, index: true },
            { element: <ListUserContainer />, path: 'users' },
            { element: <Order />, path: 'orders' },
          ],
        },
      ],
    },
  ]);
  return element;
};

export default Router;
