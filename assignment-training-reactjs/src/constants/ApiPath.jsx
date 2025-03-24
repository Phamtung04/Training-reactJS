export const API_PATH = {
  AUTH: {
    REGISTER: '/users/create',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CONFIRM_PASSWORD: '/auth/confirm-password-code',
  },
  USER: {
    LIST_USER: '/users/list',
    UPDATE_USER: '/users/update',
    DELETE_USER: '/users/delete',
    GET_USER_BY_ID: '/users/detail',
  },
};

export default API_PATH;
