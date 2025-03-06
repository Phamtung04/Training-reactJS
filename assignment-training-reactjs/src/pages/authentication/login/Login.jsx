import { Box } from '@mui/material';
import React, { Fragment, useState } from 'react';
import {useFormContext } from 'react-hook-form';
import CustomTextField from './../../../components/Field/TextField';

const Login = () => {
 const {control} = useFormContext();

  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <CustomTextField
          id="filled-search"
          label="Email"
          name='email'
          placeholder="your@email.com"
          variant="filled"
          control={control}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            width: '300px',
          }}
        />
      </Box>

      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <CustomTextField
          id="outlined-password-input"
          label="Password"
          name='password'
          type="password"
          placeholder="*********"
          control={control}
          sx={{
            width: '300px',
            input: { color: 'white' },
            label: { color: 'white' },
          }}
        />
      </Box>
    </Fragment>
  );
};

export default Login;
