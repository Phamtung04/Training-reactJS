import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Skeleton, Typography } from '@mui/material';
import Login from './Login';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../api/apiService/AuthService';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { useTranslation } from 'react-i18next';
import { loginSchema } from './config';

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
      console.log('login success:', data);
      localStorage.setItem('token', data.data.data.accessToken);
    },

    onError: (error) => {
      showError(error.response.data.message);
      console.error('Lỗi khi đăng nhập:', error);
    },
  });

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
          {/* <Button variant="contained" type="submit" sx={{ my: 3, ml: 1, width: '300px' }}>
            {t('loginContainer.Login')}
          </Button>
          {mutation.isLoading && <CircularProgress size={24} />} */}
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
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <>
                <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                <Skeleton width={100} height={24} />
              </>
            ) : (
              t('loginContainer.Login')
            )}
          </Button>

          <div className="flex gap-2 items-center justify-center">
            <Link
              to="/forgot-password"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
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
    </FormProvider>
  );
};

export default LoginContainer;
