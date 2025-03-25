import { Box, DialogContent } from '@mui/material';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../../../components/field/TextField';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <DialogContent>
        <Box>{t('resetPasswordContainer.title')}</Box>
        <CustomTextField
          id="email"
          name="email"
          placeholder={t('passCodeContainer.input')}
          type="email"
          fullWidth
        />
      </DialogContent>
    </Fragment>
  );
};
