import API_PATH from '../../constants/apiPath';
import Api from '../api';

export const UserService = {
  listUser: (data, page = 0, limit = 0, sortName = '', direction = '') => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      sortName,
      direction,
    }).toString();

    return Api.post(`${API_PATH.USER.LIST_USER}?${queryParams}`, data);
  },

  updateUser: (data) =>
    Api.post(API_PATH.USER.UPDATE_USER, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteUser: (data) => Api.post(API_PATH.USER.DELETE_USER, data),
  getUserById: (data) => Api.post(API_PATH.USER.GET_USER_BY_ID, data),
};
