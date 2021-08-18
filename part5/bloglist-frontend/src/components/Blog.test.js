import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

describe("render a blog", () => {
  let component;

  beforeEach(() => {
    const blog = {
      id: "12345",
      title: "Title",
      author: "Author",
      url: "url",
      likes: 1,
      user: {
        id: "12345",
        name: "Name",
        username: "Username",
      },
    };
    component = render(<Blog blog={blog} />);
  });

  test("doesn't show its URL and likes by default", () => {
    const divBlog = component.container.querySelector(".blog-style");
    expect(divBlog).toHaveTextContent("Title");
    expect(divBlog).toHaveTextContent("Author");
    expect(divBlog).not.toHaveTextContent("url");
    expect(divBlog).not.toHaveTextContent("likes");
  });

  test("and click in view button shows its details", () => {
    expect(component.container).not.toHaveTextContent("url");
    expect(component.container).not.toHaveTextContent("likes");
    const buttonToShowDetails = component.getByText("view");
    fireEvent.click(buttonToShowDetails);
    expect(component.container).toHaveTextContent("url");
    expect(component.container).toHaveTextContent("likes");
  });
});
