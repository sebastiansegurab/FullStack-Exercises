const logger = require("./logger")

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    switch (error.name) {
        case "CastError":
            response.status(400).send({ error: "malformed id" })
        case "ValdationError":
            response.status(400).send({ error: error.message })
        default: response.status(500).send({ error: error.message })
    }
    next(error)
}

module.exports = { unknownEndpoint, errorHandler }