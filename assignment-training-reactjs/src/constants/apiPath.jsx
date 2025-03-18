const URL_API = import.meta.env.VITE_BASE_URL;

export const API_PATH = {
  AUTH: {
    REGISTER: `${URL_API}/api/v1/users/create`,
    LOGIN: `${URL_API}/api/v1/auth/login`,
    FORGOT_PASSWORD: `${URL_API}/api/v1/auth/forgot-password`,
    CONFIRM_PASSWORD: `${URL_API}/api/v1/auth/confirm-password-code`,
  },
  USER: {
    // SEARCH_USER: `${URL_API}/api/v1/users/list?page=1&limit=20&sortName=role&direction=ASC`,
    LIST_USER: `${URL_API}/api/v1/users/list`,
    UPDATE_USER: `${URL_API}/api/v1/users/update`,
    DELETE_USER: `${URL_API}/api/v1/users/delete`,
    GET_USER_BY_ID: `${URL_API}/api/v1/users/detail`,
  },
};

export default API_PATH;
