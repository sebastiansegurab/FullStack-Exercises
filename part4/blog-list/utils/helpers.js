const { app } = require("../index");
const supertest = require("supertest");
const api = supertest(app);

const initialUsers = [
  { username: "hellas", password: "12345", name: "Arto Hellas" },
  { username: "mluukkai", password: "12345", name: "Matti Luukkainen" },
];

const initialBlogs = [
  { title: "title1", author: "author1", url: "url1", likes: 1 },
  { title: "title2", author: "author2", url: "url2", likes: 2 },
];

const usersInDB = async () => {
  const users = await api.get("/api/users");
  return users.body;
};

const blogsInDB = async () => {
  const blogs = await api.get("/api/blogs");
  return blogs.body;
};

const usernamesInBD = async () => {
  const users = await usersInDB();
  const usernames = users.map((user) => user.username);
  return usernames;
};

module.exports = {
  api,
  initialUsers,
  initialBlogs,
  usersInDB,
  blogsInDB,
  usernamesInBD,
};
