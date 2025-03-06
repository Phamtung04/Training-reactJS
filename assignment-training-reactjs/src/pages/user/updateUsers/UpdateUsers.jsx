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
import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import UpdateUserContainer from './UpdateUserContainer';
import { gender, role } from '../../../constants/Enum';

const UpdateUsers = () => {
  const { register, handleSubmit, onSubmit, errors, handleFileChange, preview } =
    UpdateUserContainer();
  return (
    <div className="items-center justify-center flex h-screen">
      <Card
        sx={{
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
          color: 'white',
        }}
        className="w-full mx-auto p-4 shadow-lg rounded-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Typography variant="h2" component="h5">
              Update
            </Typography>
            <Box sx={{ height: '', display: 'flex' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                {/* <ImageIcon sx={{ mr: 1, my: 0.5 }} /> */}
                <TextField
                  id="fileInput"
                  label="Avatar"
                  variant="standard"
                  type="file"
                  className="w-70"
                  inputProps={{ accept: 'image/*' }}
                  {...register('avatar')}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  sx={{
                    input: { color: 'white' },
                    label: { color: 'white' },
                  }}
                />
                <Button
                  variant="contained"
                  component="label"
                  htmlFor="fileInput"
                  sx={{ backgroundColor: 'transparent', borderRadius: 5 }}
                >
                  {!preview && (
                    <p>
                      <ImageIcon sx={{ mr: 1, my: 0.5 }} />
                      Thay đổi avatar
                    </p>
                  )}
                  {preview && (
                    <Box>
                      <img src={preview} alt="Preview" className=" w-40 h-40 rounded-full" />
                    </Box>
                  )}
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Box sx={{ height: '60px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="userName"
                    variant="standard"
                    className="w-70"
                    {...register('userName')}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                    }}
                  />
                </Box>
                {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
              </Box>

              <Box sx={{ height: '60px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
                  <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Full name"
                    variant="standard"
                    className="w-70"
                    {...register('fullName')}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                    }}
                  />
                </Box>
                {errors.fullName && <p className="text-red-500 ml-10">{errors.fullName.message}</p>}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Box sx={{ height: '60px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <EmailIcon sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    type="email"
                    id="input-with-sx"
                    label="Email"
                    variant="standard"
                    value={'a@b.com'}
                    className="w-70"
                    {...register('email')}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                    }}
                  />
                </Box>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </Box>

              <Box sx={{ height: '60px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5 }}>
                  <ContactPhoneIcon sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Phone number"
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
                    {...register('phoneNumber')}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                    }}
                  />
                </Box>
                {errors.phoneNumber && (
                  <p className="text-red-500 ml-10">{errors.phoneNumber.message}</p>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Box sx={{ alignItems: 'flex-end', height: '60px' }}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Date birth"
                  type="date"
                  sx={{ ml: 0.5, my: 0.5, input: { color: 'white' }, label: { color: 'white' } }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          {/* <InsertInvitationIcon /> */}
                        </InputAdornment>
                      ),
                    },
                  }}
                  variant="standard"
                  className="w-50"
                  {...register('dob')}
                />
                {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, height: '60px' }}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, my: 0.5, input: { color: 'white' }, label: { color: 'white' } }}
                >
                  <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleSubmit}
                    label="Gender"
                    className="w-50"
                    defaultValue=""
                    sx={{
                      color: 'white',
                      '& .MuiSvgIcon-root': { color: 'white' },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                    {...register('gender')}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={gender.NAM}>Nam</MenuItem>
                    <MenuItem value={gender.NU}>Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, height: '60px' }}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, my: 0.5, input: { color: 'white' }, label: { color: 'white' } }}
                >
                  <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleSubmit}
                    label="Age"
                    className="w-50"
                    defaultValue=""
                    {...register('role')}
                    sx={{
                      color: 'white',
                      '& .MuiSvgIcon-root': { color: 'white' },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  >
                    <MenuItem value={role.ADMIN}>Quản trị viên</MenuItem>
                    <MenuItem value={role.USER}>Nhân viên</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Box sx={{ height: '60px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <DescriptionIcon sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    variant="standard"
                    className="w-70"
                    rows={4}
                    {...register('description')}
                    inputProps={{
                      style: { color: 'white' },
                    }}
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                  />
                </Box>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </Box>
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 3, float: 'right', bgcolor: 'white', color: 'black' }}
          >
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateUsers;
