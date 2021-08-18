import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("render a blog don't show its URL and likes by default", () => {
  const blog = {
    id: "12345",
    title: "Title",
    author: "Author",
    url: "url",
    likes: 1,
    user: {
        id: '12345',
        name: 'Name',
        username: 'Username'
    }
  };

  const component = render(
    <Blog blog={blog} />
  );

  const divBlog = component.container.querySelector(".blog-style");
  expect(divBlog).toHaveTextContent("Title");
  expect(divBlog).toHaveTextContent("Author");
  expect(divBlog).not.toHaveTextContent("url");
  expect(divBlog).not.toHaveTextContent("likes");
});
