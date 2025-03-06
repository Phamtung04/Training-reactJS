import { DialogContent, DialogContentText } from '@mui/material';
import React, { Fragment } from 'react';
import CustomTextField from './../../../components/Field/TextField';
import { useFormContext } from 'react-hook-form';

export const ForgotPassword = () => {
  const { control } = useFormContext();
  return (
    <Fragment>
      <DialogContent>
        <DialogContentText sx={{ color: 'white' }}>
          Please enter your email address and we will send you a password code to reset your
          password.
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
