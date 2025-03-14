import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotSchema } from '../../../yupGlobal';
import { ForgotPassword } from './ForgotPassword';
import { Button, Card, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../api/apiService/AuthService';
import PasswordCode from '../passwordCode/PasswordCode';
import { useNavigate } from 'react-router-dom';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';
import { PasswordVerifiedContext } from '../../../contexts/PasswordVerifiedContext';
import { useTranslation } from 'react-i18next';

const ForgotPasswordContainer = () => {

  const { setEmail } = useContext(PasswordVerifiedContext);
  const {t} = useTranslation();


  const navigate = useNavigate();
  const { showError } = useErrorAndSuccess();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(forgotSchema),
  });

  const { handleSubmit } = methods;

  const forgotPasswordMutation = useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: (data) => {
      navigate('/password-code');
      console.log('forgot password success:', data);
    },
    onError: (error) => {
      showError(VALIDATE_CODES.I0002);
      console.error('Lỗi khi đăng nhập:', error);
    },
  });

  const handleClose = () => {
    navigate('/');
  };

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate(data);
    setEmail(data.email);
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Card
        sx={{
          background: 'linear-gradient(90deg, #9810fa  0%, #3B82F6 100%)',
          color: 'white',
          width: '400px',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{t('resetPasswordContainer.reset')}</DialogTitle>
          <ForgotPassword />
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={handleClose}>{t('resetPasswordContainer.cancel')}</Button>
            <Button variant="contained" type="submit">
            {t('resetPasswordContainer.continue')}
            </Button>
          </DialogActions>
        </form>
      </Card>
    </FormProvider>
  );
};

export default ForgotPasswordContainer;
