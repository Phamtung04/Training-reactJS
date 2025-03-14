import { AccountCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyIcon from '@mui/icons-material/Key';
import { gender, role } from '../../../constants/Enum';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import CustomTextField from '../../../components/Field/TextField';
import CustomSelectField from '../../../components/Field/CustomSelectField';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { control } = useFormContext();
  const {t} = useTranslation();
  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Typography variant="h2" component="h5">
        {t('registerContainer.register')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                name="userName"
                label={t('registerContainer.userName')}
                variant="standard"
                control={control}
                className="w-70"
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
              <AccountCircle sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                name="fullName"
                label={t('registerContainer.fullName')}
                variant="standard"
                control={control}
                className="w-70"
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                type="email"
                id="input-with-sx"
                name="email"
                control={control}
                label={t('registerContainer.Email')}
                variant="standard"
                className="w-70"
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
              <ContactPhoneIcon sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                label={t('registerContainer.phone')}
                name="phoneNumber"
                control={control}
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
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ alignItems: 'flex-end', height: '60px' }}>
            <Controller
              name="dob"
              defaultValue=""
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label={t('registerContainer.birthday')}
                  control={control}
                  type="date"
                  value={field.value || ''}
                  // value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                  // onChange={(e) => {
                  //   const formattedDate = e.target.value
                  //     ? dayjs(e.target.value).format('YYYY-MM-DD')
                  //     : '';
                  //   field.onChange(formattedDate);
                  // }}
                  variant="standard"
                  className="w-50"
                  sx={{
                    ml: 0.5,
                    my: 0.5,
                    input: { color: 'white' },
                    label: { color: 'white' },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, height: '60px'}}>
            <CustomSelectField
              name="gender"
              label={t('registerContainer.gender')}
              control={control}
              options={[
                { value: gender.NAM, label: t('registerContainer.male')},
                { value: gender.NU, label: t('registerContainer.female') },
              ]}
              sx={{
                ml: 0.5,
                my: 0.5,
                input: { color: 'white' },
                label: { color: 'white' },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, height: '60px' }}>
            <CustomSelectField
              name="role"
              label={t('registerContainer.role')}
              control={control}
              options={[
                { value: role.ADMIN, label: t('registerContainer.admin') },
                { value: role.USER, label: t('registerContainer.user') },
              ]}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <KeyIcon sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                label={t('registerContainer.Password')}
                name="password"
                variant="standard"
                type="password"
                className="w-70"
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
              <KeyIcon sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                label={t('registerContainer.confirmPassword')}
                variant="standard"
                name="confirmPassword"
                type="password"
                control={control}
                className="w-70"
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Register;
