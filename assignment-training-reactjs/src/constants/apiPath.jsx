const URL_API = import.meta.env.VITE_BASE_URL;

export const API_PATH = {
  AUTH: {
    REGISTER: `${URL_API}/users/create`,
    LOGIN: `${URL_API}/auth/login`,
    FORGOT_PASSWORD: `${URL_API}/auth/forgot-password`,
    CONFIRM_PASSWORD: `${URL_API}/auth/confirm-password-code`,
  },
  USER: {
    LIST_USER: `${URL_API}/users/list`,
    UPDATE_USER: `${URL_API}/users/update`,
    DELETE_USER: `${URL_API}/users/delete`,
    GET_USER_BY_ID: `${URL_API}/users/detail`,
  },
};

export default API_PATH;
