const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static("build"))
const cors = require("cors")
app.use(cors())

require("dotenv").config()
require('./mongo')
const Person = require('./models/Person')

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>")
})

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => next(error))
})

app.get("/api/persons/info", (request, response, next) => {
  Person.countDocuments({}, function (err, count) {
    response.status(200).json({ message: `Phonebook has info for ${count} people ${new Date()}` })
  }).catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  const { id } = request.params
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      return response.status(404).json({ error: "Person doesn't exists" })
    }
  }).catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  const { id } = request.params
  if (id.length < 24) {
    response.status(400).json({ error: "Bad request." })
  } else {
    Person.findByIdAndRemove(id).then(result => {
      if (result) {
        response.status(204).json({ message: "Person removed" })
      } else {
        return response.status(404).json({ error: "Person doesn't exists" })
      }
    }).catch(error => next(error))
  }
})

app.post("/api/persons", (request, response, next) => {
  const { body } = request
  if (
    body.name === undefined ||
    body.name === null ||
    body.name === "" ||
    body.number === undefined ||
    body.number === null ||
    body.number === ""
  ) {
    response.status(400).json({ error: "Content missing." }).end()
  } else {
    Person.find({ name: body.name }).then(person => {
      if (person.length > 0) {
        response.status(409).json({ error: "Person already exists." })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number
        })
        person.save().then(person => {
          response.json(person)
        }).catch(error => {
          response.status(500).send({ error: error.message }).end()
        })
      }
    }).catch(error => next(error))
  }
})

app.use((error, request, response, next) => {
  response.status(500).send({ error: error.message }).end()
})

app.use((request, response) => {
  response.status(404).send({ error: "Unknown endpoint " })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
