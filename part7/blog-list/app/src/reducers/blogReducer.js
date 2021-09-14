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

export const addLikeBlog = (blog) => {
  return async (dispatch) => {
    const blogLiked = await blogService.updateBlog(blog);
    dispatch({
      type: "ADD_LIKE_TO_BLOG",
      data: blogLiked,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.removeBlog(id);
    dispatch({
      type: "REMOVE_BLOG",
      data: id,
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
    case "ADD_LIKE_TO_BLOG":
      return state.map((blog) => {
        if (blog.id === action.data.id) {
          return action.data;
        }
        return blog;
      });
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

export default blogReducer;
