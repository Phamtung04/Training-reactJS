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
    if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
      return Promise.reject(error);
    } else if (
      error.response &&
      error.response.status === STATUS_CODE.BAD_REQUEST &&
      error.response.data.details?.length > 0
    ) {
      return error.response;
    } else {
      return Promise.reject(error);
    }
  },
);

export default Api;
