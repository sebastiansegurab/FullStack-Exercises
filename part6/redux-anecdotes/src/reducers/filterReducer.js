export const filterAnecdotes = (filter) => {
  return {
    type: "FILTER",
    payload: {
      filter,
    },
  };
};

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      const { payload } = action;
      return payload.filter;
    default:
      return state;
  }
};

export default filterReducer;
