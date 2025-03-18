import { Box, DialogContent, DialogContentText } from '@mui/material';
import React, { Fragment } from 'react';
import CustomTextField from './../../../components/Field/TextField';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';


export const ForgotPassword = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <Fragment>
      <DialogContent>
        <Box>
        {t('resetPasswordContainer.title')}
        </Box>
        <CustomTextField
          id="email"
          name="email"
          control={control}
          placeholder={t('passCodeContainer.input')}
          type="email"
          fullWidth
        />
      </DialogContent>
    </Fragment>
  );
};
