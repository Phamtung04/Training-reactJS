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
import { VALIDATE_CODES } from '../../../constants/validateCode';
import { loginSchema } from './config';

const LoginContainer = () => {
  const navigate = useNavigate();
  const { showError } = useErrorAndSuccess();
  const { t } = useTranslation();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit, setError } = methods;

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.data.accessToken);
      navigate('/users');
    },

    onError: (error) => {
      if (error.isValidationError) {
        error.validationErrors.forEach((err) => {
          setError(err.field, {
            type: 'server',
            message: err.message,
          });
        });

        return;
      }
      showError(error.response?.data?.message || VALIDATE_CODES.I0003);
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
            {t('loginContainer.login')}
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
              {t('loginContainer.login')}
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
