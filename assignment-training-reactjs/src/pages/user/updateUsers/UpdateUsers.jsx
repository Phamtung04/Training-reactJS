import { AccountCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import { Controller, useFormContext } from 'react-hook-form';
import CustomSelectField from '../../../components/Field/CustomSelectField';
import { gender, role } from '../../../constants/Enum';
import CustomTextField from './../../../components/Field/TextField';
import dayjs from 'dayjs';

const UpdateUsers = ({ handleFileChange, preview }) => {
  const { control } = useFormContext();
  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Typography variant="h2" component="h5">
          Update
        </Typography>
        <Box sx={{ height: '', display: 'flex' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CustomTextField
              id="fileInput"
              label="Avatar"
              name="avatar"
              variant="standard"
              type="file"
              className="w-70"
              inputProps={{ accept: 'image/*' }}
              control={control}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
              }}
              value={undefined}
            />
            <Button
              variant="contained"
              component="label"
              htmlFor="fileInput"
              sx={{ backgroundColor: 'transparent', borderRadius: 5 }}
            >
              {!preview && (
                <div>
                  <p className="text-white">
                    <ImageIcon sx={{ mr: 1, my: 0.5 }} />
                    Thay đổi avatar
                  </p>
                </div>
              )}
              {preview && (
                <Box>
                  <img src={preview} alt="Preview" className="w-40 h-40 rounded-full" />
                </Box>
              )}
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: '60px' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon sx={{ mr: 1, my: 0.5 }} />
            <CustomTextField
              type="email"
              id="input-with-sx"
              name="email"
              control={control}
              label={'Email'}
              variant="standard"
              className="w-70"
              disabled
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                label="userName"
                name="userName"
                variant="standard"
                className="w-70"
                control={control}
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
                label="Full name"
                name="fullName"
                variant="standard"
                className="w-70"
                control={control}
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
                  value={field.value || ''}
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
                    width: '310px',
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
              <ContactPhoneIcon sx={{ mr: 1, my: 0.5 }} />
              <CustomTextField
                id="input-with-sx"
                label="Phone number"
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
                control={control}
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '60px' }}>
            <CustomSelectField
              name="gender"
              label="Gender"
              value={gender.NAM ?? ''}
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
              value={role.ADMIN ?? ''}
              control={control}
              options={[
                { value: role.ADMIN, label: 'Quản trị viên' },
                { value: role.USER, label: 'Nhân viên' },
              ]}
              sx={{
                ml: 0.5,
                my: 0.5,
                input: { color: 'white' },
                label: { color: 'white' },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '55px', ml: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CustomTextField
                id="standard-multiline-static"
                label="Description"
                name="description"
                multiline
                variant="standard"
                className="w-104"
                rows={2}
                control={control}
                inputProps={{
                  style: { color: 'white' },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default UpdateUsers;
