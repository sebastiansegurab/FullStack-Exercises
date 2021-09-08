import React from "react";
import Toggable from "./Toggable";
import PropTypes from "prop-types";

import "../App.css";

const Blog = ({ blog, addLikeToBlog, removeBlog }) => {
  const addLike = (event) => {
    event.preventDefault();
    blog.likes++;
    addLikeToBlog(blog);
  };

  const remove = (event) => {
    event.preventDefault();
    removeBlog(blog.id);
  };

  return (
    <div className="blog-style">
      {blog.title} - {blog.author}
      <Toggable buttonOnChildren="hide" buttonOutsideChildren="view">
        <div>
          {blog.url}
          <br />
          likes {blog.likes} <button data-test-id="buttonLike" onClick={addLike}>like</button>
          <br />
          <button onClick={remove}>remove</button>
        </div>
      </Toggable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
  addLikeToBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
