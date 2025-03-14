import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateSchema } from '../../../yupGlobal';
import UpdateUsers from './UpdateUsers';
import { Button, Card } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../../api/apiService/UserService';
import Api from '../../../api/Api';
import API_PATH from '../../../constants/apiPath';
import dayjs from 'dayjs';

const UpdateUserContainer = ({ id, onclose }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(updateSchema),
  });

  const { handleSubmit, setValue } = methods;
  const [preview, setPreview] = useState(null);

  const queryClient = useQueryClient();

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
      console.log('response: ', response.data);
      return response.data;
    },
    onSuccess: () => {
      onclose();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
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
    console.log('Dữ liệu từ form:', data);

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
    console.log('Dữ liệu gửi đi:', Array.from(formData.entries()));
  };
  return (
    <FormProvider {...methods}>
      <div className="items-center justify-center flex h-screen w-1/2 mx-auto">
        <Card
          sx={{
            background:
              'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
            color: 'white',
          }}
          className="w-full mx-auto p-4 shadow-lg rounded-lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <UpdateUsers handleFileChange={handleFileChange} preview={preview} />
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
    </FormProvider>
  );
};

export default UpdateUserContainer;
