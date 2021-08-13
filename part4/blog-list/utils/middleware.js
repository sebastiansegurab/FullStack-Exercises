const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  switch (error.name) {
    case "CastError":
      response.status(400).send({ error: "malformed id" });
    case "ValdationError":
      response.status(400).send({ error: error.message });
    default:
      response.status(500).send({ error: error.message });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

module.exports = { unknownEndpoint, errorHandler, tokenExtractor };
