import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUUCCESS,
  USER_LOGOUT,
  REFRESH,
} from "../actions/types";

const initialState = {
  account: {
    email: "",
    auth: false,
    token: "",
  },
  isLoading: false,
  isError: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        account: {
          auth: false,
        },
      };
    case FETCH_USER_SUUCCESS:
      console.log("check redux", action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        account: {
          email: action.payload.email,
          token: action.payload.token,
          auth: true,
        },
      };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      return {
        ...state,
        account: {
          email: "",
          auth: false,
          token: "",
        },
      };
    case REFRESH:
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          auth: true,
          token: localStorage.getItem("token"),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
