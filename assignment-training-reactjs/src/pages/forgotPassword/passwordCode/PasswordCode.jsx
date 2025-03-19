import { Box, DialogContent } from '@mui/material';
import React, { Fragment } from 'react';
// import { useFormContext } from 'react-hook-form';
import CustomTextField from './../../../components/Field/TextField';
import { useTranslation } from 'react-i18next';

const PasswordCode = () => {
  // const { control } = useFormContext();
  const {t} = useTranslation();
  return (
    <Fragment>
      <DialogContent>
        <Box>
        {t('passCodeContainer.title')}
        </Box>
        <CustomTextField
          id="passwordCode"
          name="passwordCode"
          placeholder={t('passCodeContainer.passwordCode')}
          fullWidth
          // control={control}
          sx={{ mt: 3}}
        />
      </DialogContent>
    </Fragment>
  );
};

export default PasswordCode;
