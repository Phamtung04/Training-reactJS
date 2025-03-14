import { yupResolver } from '@hookform/resolvers/yup';
import { DialogContent, DialogContentText } from '@mui/material';
import React, { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import CustomTextField from './../../../components/Field/TextField';
import { useTranslation } from 'react-i18next';

const PasswordCode = () => {
  const { control } = useFormContext();
  const {t} = useTranslation();
  return (
    <Fragment>
      <DialogContent>
        <DialogContentText sx={{ color: 'white' }}>
        {t('passCodeContainer.title')}
        </DialogContentText>
        <CustomTextField
          autoFocus
          required
          margin="dense"
          id="passwordCode"
          name="passwordCode"
          placeholder="Password code"
          fullWidth
          control={control}
          sx={{ mt: 3, input: { color: 'white' } }}
        />
      </DialogContent>
    </Fragment>
  );
};

export default PasswordCode;
