const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, server } = require("../index");
const Blog = require("../models/Blog");
const api = supertest(app);

const initialBlogs = [
  { title: "title1", author: "author1", url: "url1", likes: 1 },
  { title: "title2", author: "author2", url: "url2", likes: 2 },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blog1 = new Blog(initialBlogs[0]);
  await blog1.save();
  const blog2 = new Blog(initialBlogs[1]);
  await blog2.save();
});

describe("return all blogs", () => {
  test("the response will have a size equal to its initial state", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("create a blog", () => {
  test("return a blog with id property", async () => {
    const blog3 = {
      title: "title3",
      author: "author3",
      url: "url3",
      likes: 3,
    };
    const response = await api.post("/api/blogs").send(blog3);
    expect(response.body.id).toBeDefined();
  });

  test("return a blog with the same actor", async () => {
    const blog4 = {
      title: "title4",
      author: "author4",
      url: "url4",
      likes: 4,
    };
    await api.post("/api/blogs").send(blog4);
    const blogsInBD = await api.get("/api/blogs");
    expect(blogsInBD.body).toHaveLength(initialBlogs.length + 1);
    expect(blogsInBD.body[2].author).toBe("author4");
  });

  test("without property 'likes', this will be zero", async () => {
    const blog5 = {
      title: "title5",
      author: "author5",
      url: "url5",
    };
    await api.post("/api/blogs").send(blog5);
    const blogsInBD = await api.get("/api/blogs");
    expect(blogsInBD.body[2].likes).toBe(0);
  });

  test("without some properties is a bad request", async () => {
    const blog6 = {
      title: "title5",
      url: "url5",
    };
    await api.post("/api/blogs").send(blog6).expect(400);
  });
});

describe.only("get a blog", () => {
  test("return a blog with the same structure and data", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToSearch = blogs.body[0]
    const blog = await api.get(`/api/blogs/${blogToSearch.id}`);
    expect(blog.body).toEqual(blogToSearch);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
