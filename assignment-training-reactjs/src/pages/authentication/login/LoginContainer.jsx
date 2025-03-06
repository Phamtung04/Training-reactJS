import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card } from '@mui/material';
import Login from './Login';
import { loginSchema } from './../../../yupGlobal';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../api/apiService/AuthService';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';

const LoginContainer = () => {
  const navigate = useNavigate();
  const {showError} = useErrorAndSuccess();


  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      navigate('/users');
      console.log('login success:', data)
      localStorage.setItem('token', data.token);
    },

    onError: (error) => {
      showError(VALIDATE_CODES.I0003);
      console.error('Lỗi khi đăng nhập:', error);
    }
  })

  const handleClickOpen = () => {
    navigate('/forgot-password');
  };

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <Card
        sx={{
          background: 'linear-gradient(90deg, #9810fa  0%, #3B82F6 100%)',
          color: 'white',
          justifyItems: 'center',
          width: '500px',
        }}
      >
        <h1 className="my-5">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Login />

          <Button variant="contained" type="submit" sx={{ my: 3, ml: 1, width: '300px' }}>
            Login
          </Button>
          <div className="flex gap-2 items-center justify-center">
            <Link
              to="/forgot-password"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              <p className='text-white'>Forgot your password?</p>
            </Link>
          </div>
        </form>
        <div className="flex gap-2 items-center justify-center my-5">
          <p>if you have already account?</p>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </Card>
    </FormProvider>
  );
};

export default LoginContainer;
