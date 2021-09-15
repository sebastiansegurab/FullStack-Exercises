import React, { useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Users from "./components/Users";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  addNewBlog,
  addLikeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { setUser, loginUser, logoutUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    if (
      window.localStorage.getItem("user") !== null &&
      window.localStorage.getItem("user") !== undefined
    ) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const login = (username, password) => {
    dispatch(loginUser(username, password));
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  const addBlog = (blog) => {
    dispatch(addNewBlog(blog));
    dispatch(
      setNotification(
        `a new blog '${blog.title}' by ${user.name} added.`,
        "success"
      )
    );
  };

  const addLikeToBlog = (blog) => {
    dispatch(addLikeBlog(blog));
    dispatch(setNotification(`Blog '${blog.title}' liked.`, "success"));
  };

  const removeBlog = (blog) => {
    if (blog.user.id !== user.id) {
      dispatch(
        setNotification(`User is not the creator of the note.`, "error")
      );
      return;
    }
    dispatch(deleteBlog(blog.id));
  };

  return (
    <>
      <Notification notification={notification} />
      {user === null || user === undefined ? (
        <div>
          <Login loginUser={login} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>Users</h2>
          <Users users={users} />
          <h2>create new</h2>
          <Toggable
            buttonOnChildren="cancel"
            buttonOutsideChildren="create new blog"
          >
            <CreateBlog addBlog={addBlog} />
          </Toggable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLikeToBlog={addLikeToBlog}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
