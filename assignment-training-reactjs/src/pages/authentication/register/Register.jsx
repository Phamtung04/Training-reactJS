import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../../../components/field/TextField';
import CustomSelectField from '../../../components/field/CustomSelectField';
import { GENDER, ROLE } from '../../../constants/enum';

const Register = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Typography variant="h4" component="h5">
          {t('registerContainer.register')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CustomTextField
                id="input-with-sx"
                name="userName"
                label={t('registerContainer.userName')}
                variant="standard"
                className="w-70"
              />
            </Box>
          </Box>

          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
              <CustomTextField
                id="input-with-sx"
                name="fullName"
                label={t('registerContainer.fullName')}
                variant="standard"
                className="w-70"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CustomTextField
                type="email"
                id="input-with-sx"
                name="email"
                label={t('registerContainer.email')}
                variant="standard"
                className="w-70"
              />
            </Box>
          </Box>

          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
              <CustomTextField
                id="input-with-sx"
                label={t('registerContainer.phone')}
                name="phoneNumber"
                variant="standard"
                className="w-70"
                onKeyDown={(e) => {
                  if (
                    !/^[0-9]+$/.test(e.key) &&
                    !['Backspace', 'Enter', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ alignItems: 'flex-end', height: '60px', mt: 3 }}>
            <Controller
              name="dob"
              defaultValue=""
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label={t('registerContainer.birthday')}
                  type="date"
                  value={field.value || ''}
                  className="w-55"
                  sx={{
                    my: 0.5,
                    '& input::-webkit-calendar-picker-indicator': {
                      filter: 'invert(0%) brightness(0%)',
                      cursor: 'pointer',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: new Date(new Date().setDate(new Date().getDate() - 1))
                      .toISOString()
                      .split('T')[0],
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, height: '60px' }}>
            <CustomSelectField
              name="gender"
              label={t('registerContainer.gender')}
              options={[
                { value: GENDER.MALE, label: t('registerContainer.male') },
                { value: GENDER.FEMALE, label: t('registerContainer.female') },
              ]}
              sx={{
                ml: 0.5,
                my: 0.5,
                width: '163px',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, height: '60px' }}>
            <CustomSelectField
              name="role"
              label={t('registerContainer.role')}
              options={[
                { value: ROLE.ADMIN, label: t('registerContainer.admin') },
                { value: ROLE.USER, label: t('registerContainer.user') },
              ]}
              sx={{
                ml: 0.5,
                my: 0.5,
                width: '163px',
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CustomTextField
                id="input-with-sx"
                label={t('registerContainer.password')}
                name="password"
                variant="standard"
                type="password"
                className="w-70"
              />
            </Box>
          </Box>
          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
              <CustomTextField
                id="input-with-sx"
                label={t('registerContainer.confirmPassword')}
                variant="standard"
                name="confirmPassword"
                type="password"
                className="w-70"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Register;
