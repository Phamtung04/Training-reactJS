import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import Login from './Login';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../api/apiService/AuthService';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { useTranslation } from 'react-i18next';
import { loginSchema } from './Config';

const LoginContainer = () => {
  const navigate = useNavigate();
  const { showError } = useErrorAndSuccess();
  const { t } = useTranslation();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      navigate('/users');
      localStorage.setItem('token', data.data.data.accessToken);
    },

    onError: (error) => {
      showError(error.response.data.message);
      console.error('Lỗi khi đăng nhập:', error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      {mutation.isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{
            justifyItems: 'center',
            width: '400px',
            height: '450px',
          }}
        >
          <Typography sx={{ mt: 3 }} variant="h4" component="h5">
            {t('loginContainer.Login')}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Login />

            <Button
              variant="contained"
              type="submit"
              sx={{
                my: 3,
                ml: 1,
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t('loginContainer.Login')}
            </Button>

            <div className="flex gap-2 items-center justify-center">
              <Link to="/forgot-password" variant="body2" sx={{ alignSelf: 'center' }}>
                <p>{t('loginContainer.forgetYourPassword')}</p>
              </Link>
            </div>
          </form>
          <div className="flex gap-2 items-center justify-center my-5 mt-10">
            <p>
              {t('loginContainer.ifYouHaveAlreadyAccount')}{' '}
              <Link to="/register">{t('loginContainer.register')}</Link>
            </p>
          </div>
        </Card>
      )}
    </FormProvider>
  );
};

export default LoginContainer;
