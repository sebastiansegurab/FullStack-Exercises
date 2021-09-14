import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  addNewBlog,
  addLikeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (
      window.localStorage.getItem("user") !== null &&
      window.localStorage.getItem("user") !== undefined
    ) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginUser = async (username, password) => {
    const user = await loginService.login(username, password);
    if (user) {
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      dispatch(setNotification("User or password incorrect.", "error"));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
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
          <Login loginUser={loginUser} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
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
