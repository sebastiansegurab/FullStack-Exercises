const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");
require("dotenv").config();

require("./utils/config");

app.use(cors());
app.use(express.json());

const blogRouter = require("./controllers/blog");

app.use("/api/blogs", blogRouter);
app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3003;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, server };
