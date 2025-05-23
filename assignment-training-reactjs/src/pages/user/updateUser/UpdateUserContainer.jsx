import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UpdateUser from './UpdateUser';
import { Button, Card, CircularProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../../api/apiService/userService';
import dayjs from 'dayjs';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { useTranslation } from 'react-i18next';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateSchema } from './config';
import { VALIDATE_CODES } from '../../../constants/validateCode';

const UpdateUserContainer = ({ id, onclose }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_IMAGE;
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(updateSchema),
  });

  const { handleSubmit, setValue, setError } = methods;
  const [preview, setPreview] = useState(null);

  const queryClient = useQueryClient();

  const { showError, showSuccess } = useErrorAndSuccess();

  const { t } = useTranslation();

  const defaultImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png';

  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => UserService.getUserById({ id }),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.data) {
      const date = dayjs(data.data.data.dob).format('YYYY-MM-DD');

      setValue('email', data.data.data.email);
      setValue('userName', data.data.data.userName);
      setValue('fullName', data.data.data.fullName);
      setValue('dob', date);
      setValue('gender', data.data.data.gender);
      setValue('role', data.data.data.role);
      setValue('phoneNumber', data.data.data.phoneNumber);
      setValue('description', data.data.data.description);

      if (data.data.data.avatar) {
        setPreview(BASE_URL + data.data.data.avatar);
      } else {
        setPreview(defaultImage);
      }
    }
  }, [data, setValue, defaultImage]);

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await UserService.updateUser(formData);
      return response.data;
    },
    onSuccess: () => {
      showSuccess(VALIDATE_CODES.I0001);
      onclose();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      if (error.isValidationError) {
        error.validationErrors.forEach((err) => {
          setError(err.field, {
            type: 'manual',
            message: err.message,
          });
        });
        return;
      }
      showError(error.response.data.message);
      console.error('Error updating user:', error);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setValue('avatar', file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('userName', data.userName);
    formData.append('fullName', data.fullName);
    formData.append('dob', data.dob);
    formData.append('gender', data.gender);
    formData.append('role', data.role);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('description', data.description ?? '');

    if (data.avatar && data.avatar instanceof File) {
      formData.append('file', data.avatar);
    }

    updateMutation.mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      {updateMutation.isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="items-center justify-center flex h-screen w-3/7 mx-auto">
          <Card className="p-4 shadow-lg rounded-lg">
            <Button
              sx={{
                float: 'right',
                color: 'black',
                '&:focus': { outline: 'none' },
              }}
              onClick={onclose}
            >
              <CancelIcon />
            </Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UpdateUser handleFileChange={handleFileChange} preview={preview} />
              <Button type="submit" variant="contained" sx={{ m: 3, float: 'right' }}>
                {t('updateUserContainer.update')}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </FormProvider>
  );
};

export default UpdateUserContainer;
