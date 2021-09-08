export const setNotification = (message, status) => {
  if (window.clearNotificationTimeout) {
    clearTimeout(window.clearNotificationTimeout);
  }
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", data: { message, status } });
    window.clearNotificationTimeout = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };
};

const notificationReducer = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return {};
    default:
      return state;
  }
};

export default notificationReducer;
