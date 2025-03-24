import axios from 'axios';
import { STATUS_CODE } from '../constants/statusCode';

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (
        error.response.status === STATUS_CODE.BAD_REQUEST &&
        error.response.data.details?.length > 0
      ) {
        // error.validationErrors = error.response.data.details;
        return Promise.resolve({
          isValidationError: true,
          validationErrors: error.response.data.details,
          originalResponse: error.response,
        });
      }
    }
    return Promise.resolve(error);
  },
);

export default Api;
