const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const logger = require("./utils/logger");
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");
require("dotenv").config();

require("./utils/config");

app.use(cors());
app.use(express.json());

const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3003;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, server };
