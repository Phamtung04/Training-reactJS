import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { VALIDATE_CODES } from '../../../constants/validateCode';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import PasswordCode from './PasswordCode';
import { useNavigate } from 'react-router-dom';
import { PasswordVerifiedContext } from '../../../contexts/PasswordVerifiedContext';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../api/apiService/AuthService';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { useTranslation } from 'react-i18next';

const PasswordCodeContainer = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useErrorAndSuccess();
  const { email } = useContext(PasswordVerifiedContext);
  const { t } = useTranslation();

  const schema = yup.object().shape({
    passwordCode: yup.string().required(VALIDATE_CODES.E0001),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setError } = methods;

  const mutation = useMutation({
    mutationFn: AuthService.confirmPassword,
    onSuccess: () => {
      showSuccess(VALIDATE_CODES.I0001);
      navigate('/login');
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
      showError(error.response.data.message);
      console.error('Password code error:', error);
    },
  });

  const handleClose = () => {
    navigate('/');
  };
  const onSubmit = (data) => {
    const requestBody = { email, passwordCode: data.passwordCode };
    mutation.mutate(requestBody);
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
            width: '400px',
            textAlign: 'center',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            p: 1,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" component={'h5'}>
              {t('passCodeContainer.passCode')}
            </Typography>
            <PasswordCode />
            <Box sx={{ pb: 3, px: 3, float: 'right' }}>
              <Button onClick={handleClose}>{t('passCodeContainer.cancel')}</Button>
              <Button variant="contained" type="submit">
                {t('passCodeContainer.continue')}
              </Button>
            </Box>
          </form>
        </Card>
      )}
    </FormProvider>
  );
};

export default PasswordCodeContainer;
