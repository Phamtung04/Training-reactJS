import { Box } from '@mui/material';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../../../components/field/TextField';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1, mt: 2 } }}>
        <CustomTextField
          id="filled-search"
          label={t('loginContainer.Email')}
          name="email"
          placeholder="your@email.com"
          sx={{
            width: '300px',
          }}
        />
      </Box>

      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <CustomTextField
          id="outlined-password-input"
          label={t('loginContainer.Password')}
          name="password"
          type="password"
          placeholder="*********"
          sx={{
            width: '300px',
          }}
        />
      </Box>
    </Fragment>
  );
};

export default Login;
