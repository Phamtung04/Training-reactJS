import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPassword } from './ForgotPassword';
import { Box, Button, Card, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../api/apiService/AuthService';
import { useNavigate } from 'react-router-dom';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { VALIDATE_CODES } from '../../../constants/validateCode';
import { PasswordVerifiedContext } from '../../../contexts/PasswordVerifiedContext';
import { useTranslation } from 'react-i18next';
import { forgotSchema } from './config';

const ForgotPasswordContainer = () => {
  const { setEmail } = useContext(PasswordVerifiedContext);
  const { t } = useTranslation();

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
          width: '400px',
          textAlign: 'center',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          p: 1,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" component="h5">
            {t('resetPasswordContainer.reset')}
          </Typography>
          <ForgotPassword />
          <Box sx={{ pb: 3, px: 3, float: 'right' }}>
            <Button onClick={handleClose}>{t('resetPasswordContainer.cancel')}</Button>
            <Button variant="contained" type="submit">
              {t('resetPasswordContainer.continue')}
            </Button>
          </Box>
        </form>
      </Card>
    </FormProvider>
  );
};

export default ForgotPasswordContainer;
