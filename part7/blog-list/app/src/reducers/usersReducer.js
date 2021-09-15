import userService from "../services/users";

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    if (users) {
      dispatch({
        type: "INITIALIZE_USERS",
        data: users,
      });
    }
  };
};

const userReducer = (state = null, action) => {
  const { type } = action;
  switch (type) {
    case "INITIALIZE_USERS":
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
