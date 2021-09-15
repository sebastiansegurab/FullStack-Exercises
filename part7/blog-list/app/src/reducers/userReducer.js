import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password);
    if (user) {
      blogService.setToken(user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        data: user,
      });
    } else {
      dispatch(setNotification("User or password incorrect.", "error"));
    }
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};

const userReducer = (state = null, action) => {
  const { type } = action;
  switch (type) {
    case "SET_USER":
      return action.data;
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;
