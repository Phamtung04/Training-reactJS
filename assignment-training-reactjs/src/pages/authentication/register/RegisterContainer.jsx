import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthService } from './../../../api/apiService/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import Register from './Register';
import { Box, Button, Card, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { registerSchema } from './config';
import { VALIDATE_CODES } from './../../../constants/validateCode';

const RegisterContainer = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, setError } = methods;

  const navigate = useNavigate();
  const { showError, showSuccess } = useErrorAndSuccess();

  const mutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      showSuccess(VALIDATE_CODES.I0001);
      navigate("/login");
    },
    onError: (error) => {
      console.log("API Error Response:", error);
  
      if (error.isValidationError) {
        error.validationErrors.forEach((err) => {
          setError(err.field, {
            type: "server",
            message: err.message,
          });
        });
  
        return;
      }
  
      showError(error.response?.data?.message || VALIDATE_CODES.I0002);
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
