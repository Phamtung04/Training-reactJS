import { Box, DialogContent } from '@mui/material';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../../../components/field/TextField';

const PasswordCode = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <DialogContent>
        <Box>{t('passCodeContainer.title')}</Box>
        <CustomTextField
          id="passwordCode"
          name="passwordCode"
          placeholder={t('passCodeContainer.passwordCode')}
          fullWidth
          sx={{ mt: 3 }}
        />
      </DialogContent>
    </Fragment>
  );
};

export default PasswordCode;
