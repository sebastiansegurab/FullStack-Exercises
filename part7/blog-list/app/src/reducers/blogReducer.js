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

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog);
    dispatch({
      type: "ADD_BLOG",
      data: newBlog,
    });
  };
};

const blogReducer = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case "INITIAL_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    default:
      return state;
  }
};

export default blogReducer;
