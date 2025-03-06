import { yupResolver } from '@hookform/resolvers/yup';
import { DialogContent, DialogContentText } from '@mui/material';
import React, { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import CustomTextField from './../../../components/Field/TextField';

const PasswordCode = () => {
  const { control } = useFormContext();

  return (
    <Fragment>
      <DialogContent>
        <DialogContentText sx={{ color: 'white' }}>
          Please enter the confirmation code sent to your email.
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
