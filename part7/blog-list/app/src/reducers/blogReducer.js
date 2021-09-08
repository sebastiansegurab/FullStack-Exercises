import blogService from "../services/blogs";

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INITIAL_BLOGS",
      data: blogs,
    });
  };
};

const blogReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case "INITIAL_BLOGS":
      return action.data;
    default:
      return state;
  }
};

export default blogReducer;
