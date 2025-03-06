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

const Register = () => {
  const { control } = useFormContext();
  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Typography variant="h2" component="h5">
          Register
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                name="userName"
                label="userName"
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
                label="Full name"
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
                label="Email"
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
                label="Phone number"
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
                  label="Date birth"
                  control={control}
                  type="date"
                  value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                  onChange={(e) => {
                    const formattedDate = e.target.value
                      ? dayjs(e.target.value).format('YYYY-MM-DD')
                      : '';
                    field.onChange(formattedDate);
                  }}
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
              label="Gender"
              control={control}
              options={[
                { value: gender.NAM, label: 'Nam' },
                { value: gender.NU, label: 'Nữ' },
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
              label="Role"
              control={control}
              options={[
                { value: role.ADMIN, label: 'Quản trị viên' },
                { value: role.USER, label: 'Nhân viên' },
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
                label="Password"
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
                label="Password confirm"
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
