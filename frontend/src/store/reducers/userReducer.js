import { USER_LOGIN, USER_LOGOUT } from "../actions/types";

const initialState = {
  account: {
    email: "",
    auth: false,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        email: action.payload.email,
        auth: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        email: "",
        auth: false,
      };
    default:
      return state;
  }
};

export default userReducer;
