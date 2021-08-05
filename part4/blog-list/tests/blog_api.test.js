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

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});