import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../../yupGlobal';
import { AuthService } from './../../../api/apiService/AuthService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { VALIDATE_CODES } from '../../../constants/ValidateCode';
import Register from './Register';
import { Button, Card } from '@mui/material';

const RegisterContainer = () => {
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit } = methods;

  const navigate = useNavigate();
  const { showError, showSuccess } = useErrorAndSuccess();

  const mutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      showSuccess(VALIDATE_CODES.I0001);
      navigate('/login');
    },

    onError: (error) => {
      showError(VALIDATE_CODES.I0002);
      console.error('Lỗi khi tạo người dùng:', error);
    },
  });

  const onSubmit = (data) => {
    const formData = omit(data, ['confirmPassword']);
    mutation.mutate(formData);
    console.log(formData);
  };

  return (
    <FormProvider {...methods}>
      <Card
        sx={{
          background: 'linear-gradient(90deg, #9810fa  0%, #3B82F6 100%)',
          color: 'white',
          justifyItems: 'center',
        }}
        className="bg-gradient-to-r from-purple-600 to-blue-500"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Register />
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 3, float: 'right', bgcolor: 'white', color: 'black' }}
          >
            Register
          </Button>
        </form>
        <div className="flex gap-2 items-center justify-center pt-5">
          <p>if you have already account?</p>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </Card>
    </FormProvider>
  );
};

export default RegisterContainer;
