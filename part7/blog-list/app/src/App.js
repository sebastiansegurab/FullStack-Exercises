import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
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

  /*const addBlog = async (blog) => {
    const blogCreated = await blogService.createBlog(blog);
    if (blogCreated) {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setNotification({
        message: `a new blog '${blogCreated.title}' by ${user.name} added.`,
        status: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      setNotification({
        message: "The blog could not be created.",
        status: "fail",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const addLikeToBlog = async (blog) => {
    blog.user = user.id;
    const blogToAddLike = await blogService.updateBlog(blog);
    if (blogToAddLike) {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
  };

  const removeBlog = async (id) => {
    const response = await blogService.removeBlog(id);
    if (response) {
      setNotification({ message: response.message, status: "success" });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } else {
      setNotification({
        message: "The blog could not be removed.",
        status: "fail",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };*/

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
            <CreateBlog /*addBlog={addBlog}*/ />
          </Toggable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              /*addLikeToBlog={addLikeToBlog}
              removeBlog={removeBlog}*/
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
