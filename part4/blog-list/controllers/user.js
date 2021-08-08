const userRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

userRouter.post("/", async (request, response) => {
  const { body } = request;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    password: passwordHash,
    name: body.name,
  });
  const userCreated = await user.save();
  response.status(201).json(userCreated);
});

module.exports = userRouter;
