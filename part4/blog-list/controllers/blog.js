const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
  s;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const { body } = request;
  if (body.likes === null || body.likes === undefined) {
    body.likes = 0;
  }
  if (
    body.title === null ||
    body.title === undefined ||
    body.author === null ||
    body.author === undefined ||
    body.url === null ||
    body.url === undefined
  ) {
    response.status(400).send({
      error: "title, author and url are required",
    });
  } else {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!(token && decodedToken)) {
      response.status(401).json({ error: "token missing or invalid." });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    try {
      const blogCreated = await blog.save();
      user.blogs = user.blogs.concat(blogCreated._id);
      await user.save();
      response.status(201).json(blogCreated);
    } catch (error) {
      next(error);
    }
  }
});

blogRouter.get("/:id", async (request, response) => {
  const id = request.params.id.toString();
  const blog = await Blog.findById(id);
  response.json(blog);
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id.toString();
  const { body } = request;
  const blogUpdated = await Blog.findByIdAndUpdate(id, body, { new: true });
  response.status(200).json(blogUpdated);
});

module.exports = blogRouter;
