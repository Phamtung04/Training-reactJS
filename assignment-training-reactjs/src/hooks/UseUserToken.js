import { jwtDecode } from "jwt-decode";

export const UseUserToken = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  return {decoded};
};
