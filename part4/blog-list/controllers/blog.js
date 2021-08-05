const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if (request.body.likes === null || request.body.likes === undefined) {
    request.body.likes = 0;
  }
  if (
    request.body.title === null ||
    request.body.title === undefined ||
    request.body.author === null ||
    request.body.author === undefined ||
    request.body.url === null ||
    request.body.url === undefined
  ) {
    response.status(400).send({
      error: "title, author and url are required",
    });
  } else {
    const blog = new Blog(request.body);
    const blogCreated = await blog.save();
    response.status(201).json(blogCreated);
  }
});

blogRouter.get("/:id", async (request, response) => {
  const id = request.params.id.toString();
  const blog = await Blog.findById(id);
  response.json(blog);
});

module.exports = blogRouter;
