import { jwtDecode } from "jwt-decode";

export const useUserToken = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  return {decoded};
};
