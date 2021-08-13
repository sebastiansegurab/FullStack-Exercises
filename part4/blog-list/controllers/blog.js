const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
    if (!request.token) {
      return response.status(401).json({ error: "token missing" });
    }
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!(request.token && decodedToken)) {
        return response.status(401).json({ error: "token invalid." });
      }
      const user = await User.findById(decodedToken.id);
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
      });
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
  const { id } = request.params
  const blog = await Blog.findById(id);
  response.json(blog);
});

blogRouter.put("/:id", async (request, response) => {
  const { id } = request.params
  const { body } = request;
  const blogUpdated = await Blog.findByIdAndUpdate(id, body, { new: true });
  response.status(200).json(blogUpdated);
});

blogRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found." });
  }
  if (!request.token) {
    return response.status(401).json({ error: "token missing" });
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!(request.token && decodedToken)) {
      return response.status(401).json({ error: "token missing or invalid." });
    }
    const user = await User.findById(decodedToken.id);
    if (user._id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: "User is not the creator of the note." })
    }
    await Blog.findByIdAndDelete(id);
    response.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    next(error)
  }
});

module.exports = blogRouter;
