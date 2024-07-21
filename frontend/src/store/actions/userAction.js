import { USER_LOGIN, USER_LOGOUT } from "./types";

export const userLogin = (email, password) => ({
  type: USER_LOGIN,
  payload: { email, password },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
