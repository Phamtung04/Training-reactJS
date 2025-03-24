import { AccountCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { Controller } from 'react-hook-form';
import CustomSelectField from '../../../components/Field/CustomSelectField';
import { gender, role } from '../../../constants/enum';
import CustomTextField from './../../../components/Field/TextField';
import { useTranslation } from 'react-i18next';

const UpdateUsers = ({ handleFileChange, preview }) => {
  // const { control } = useFormContext();
  const {t} = useTranslation();
  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Typography variant="h2" component="h5">
        {t('updateUserContainer.update')}
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
              // control={control}
              onChange={handleFileChange}
              style={{ display: 'none' }}
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
                  <p>
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

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '60px', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* <EmailIcon sx={{ mr: 1, my: 0.5 }} /> */}
              <CustomTextField
                type="email"
                id="input-with-sx"
                name="email"
                // control={control}
                label={t('updateUserContainer.Email')}
                variant="standard"
                className="w-71"
                disabled
              />
            </Box>
          </Box>

          <Box sx={{ height: '60px', ml: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* <AccountCircle sx={{ mr: 1, my: 0.5 }} /> */}
              <CustomTextField
                id="input-with-sx"
                label={t('updateUserContainer.userName')}
                name="userName"
                className="w-70"
                // control={control}
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
                  label={t('updateUserContainer.birthday')}
                  // control={control}
                  type="date"
                  value={field.value || ''}
                  variant="standard"
                  className="w-70"
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
                      .split("T")[0],
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ height: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 5, mt: 0.5 }}>
              {/* <ContactPhoneIcon sx={{ mr: 1, my: 0.5 }} /> */}
              <CustomTextField
                id="input-with-sx"
                label={t('updateUserContainer.phone')}
                name="phoneNumber"
                className="w-70"
                onKeyDown={(e) => {
                  if (
                    !/^[0-9]+$/.test(e.key) &&
                    !['Backspace', 'Enter', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                // control={control}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '60px', mt: 2 }}>
            <CustomSelectField
              name="gender"
              label={t('updateUserContainer.gender')}
              value={gender.NAM ?? ''}
              // control={control}
              options={[
                { value: gender.NAM, label: t('updateUserContainer.male') },
                { value: gender.NU, label: t('updateUserContainer.female') },
              ]}
              sx={{
                ml: 0.5,
                my: 0.5,
                width: '120px',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, height: '60px' }}>
            <CustomSelectField
              name="role"
              label={t('updateUserContainer.role')}
              value={role.ADMIN ?? ''}
              // control={control}
              options={[
                { value: role.ADMIN, label: t('updateUserContainer.admin')  },
                { value: role.USER, label: t('updateUserContainer.user')  },
              ]}
              sx={{
                ml: 0.5,
                my: 0.5,
                width: '125px',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Box sx={{ height: '55px', ml: 1, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CustomTextField
                id="standard-multiline-static"
                label={t('updateUserContainer.Description')}
                name="description"
                multiline
                variant="standard"
                className="w-70"
                rows={2}
                // control={control}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default UpdateUsers;
