const loginRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { body } = request;
  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password);
  if (user && passwordCorrect) {
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    response
      .status(200)
      .json({ token, username: user.username, name: user.name });
  } else {
    response.status(401).json({ error: "User or password incorrect" });
  }
});

module.exports = loginRouter;
