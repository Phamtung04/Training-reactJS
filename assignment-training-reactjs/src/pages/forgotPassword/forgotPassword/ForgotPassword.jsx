import { DialogContent, DialogContentText } from '@mui/material';
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
        <DialogContentText sx={{ color: 'white' }}>
        {t('resetPasswordContainer.title')}
        </DialogContentText>
        <CustomTextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          control={control}
          placeholder="Email address"
          type="email"
          fullWidth
          sx={{ mt: 3, input: { color: 'white' } }}
        />
      </DialogContent>
    </Fragment>
  );
};
