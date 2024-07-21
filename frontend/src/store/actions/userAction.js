import { toast } from "react-toastify";
import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUUCCESS,
  USER_LOGOUT,
  REFRESH,
} from "./types";
import { loginApi } from "../../services/UserService";

export const userLogin = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });

    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("password", password);
      localStorage.setItem("email", email.trim());
      dispatch({
        type: FETCH_USER_SUUCCESS,
        payload: { email: email.trim(), token: res.token },
      });

      toast.success("Login successfully");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }

      dispatch({ type: FETCH_USER_ERROR });
    }
  };
};

export const userLogout = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
  };
};

export const refresh = () => {
  return (dispatch, getState) => {
    dispatch({ type: REFRESH });
  };
};
