import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, DialogActions, DialogTitle } from '@mui/material';
import PasswordCode from './PasswordCode';
import { useNavigate } from 'react-router-dom';
import { PasswordVerifiedContext } from '../../../contexts/PasswordVerifiedContext';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../api/apiService/AuthService';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { useTranslation } from 'react-i18next';

const PasswordCodeContainer = () => {
  const navigate = useNavigate();
  const {showError} = useErrorAndSuccess();
  const { email } = useContext(PasswordVerifiedContext);
  const {t} = useTranslation();

  const schema = yup.object().shape({
    passwordCode: yup.string().required(VALIDATE_CODES.E0001),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: AuthService.confirmPassword,
    onSuccess: ({email,data}) => {

      console.log('forgot password success:', {email, data});
      navigate('/login');
    },
    onError: (error) => {
      showError(VALIDATE_CODES.I0002);
      console.error('Lỗi khi đăng nhập:', error);
    }
  })

  const handleClose = () => {
    navigate('/');
  };
  const onSubmit = (data) => {
    const requestBody = { email, passwordCode: data.passwordCode };
    mutation.mutate(requestBody)
    console.log('data: ', data);
    console.log('email: ', email);
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
          <DialogTitle>{t('passCodeContainer.passCode')}</DialogTitle>
          <PasswordCode />
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={handleClose}>{t('passCodeContainer.cancel')}</Button>
            <Button variant="contained" type="submit">
            {t('passCodeContainer.continue')}
            </Button>
          </DialogActions>
        </form>
      </Card>
    </FormProvider>
  );
};

export default PasswordCodeContainer;
