import Api from '../Api';
import API_PATH from '../../constants/apiPath';

export const UserService = {
  // listUser: (data) => Api.post(`${API_PATH.USER.LIST_USER}page=1&limit=20&sortName=userName&direction=ASC`, data),
  listUser: (data, page = 1, limit = 20, sortName = 'userName', direction = 'ASC') => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      sortName,
      direction
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
