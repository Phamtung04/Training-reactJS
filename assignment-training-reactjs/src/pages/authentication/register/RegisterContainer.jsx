import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthService } from './../../../api/apiService/AuthService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { VALIDATE_CODES } from '../../../constants/validateCode';
import Register from './Register';
import { Box, Button, Card, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { registerSchema } from './config';

const RegisterContainer = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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
      showError(error.response.data.message);
      console.error('Lỗi khi tạo người dùng:', error);
    },
  });

  const onSubmit = (data) => {
    const formData = omit(data, ['confirmPassword']);
    mutation.mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      {mutation.isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{
            justifyItems: 'center',
            p: 5,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Register />
            <Button
              variant="contained"
              type="submit"
              sx={{
                m: 3,
                float: 'right',
              }}
            >
              {t('registerContainer.register')}
            </Button>
          </form>
          <div className="flex gap-2 items-center justify-center pt-5">
            <p>
              {t('registerContainer.ifYouHaveAlreadyAccount')}
              <Link to="/login"> {t('registerContainer.login')}</Link>
            </p>
          </div>
        </Card>
      )}
    </FormProvider>
  );
};

export default RegisterContainer;
