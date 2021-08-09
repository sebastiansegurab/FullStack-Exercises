const userRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.status(200).json(users);
});

userRouter.post("/", async (request, response, next) => {
  const { body } = request;
  const saltRounds = 10;
  if (body.password.length < 3) {
    response
      .status(400)
      .json({ error: "The password must have three characters at least." });
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    password: passwordHash,
    name: body.name,
  });
  try {
    const userCreated = await user.save();
    response.status(201).json(userCreated);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
