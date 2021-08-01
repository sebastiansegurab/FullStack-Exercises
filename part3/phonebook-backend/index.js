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
    body.name.trim() === "" ||
    body.number === undefined ||
    body.number === null ||
    body.number.trim() === ""
  ) {
    response.status(400).json({ error: "Content missing." }).end()
  } else {
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(personAdd => {
      response.json(personAdd)
    }).catch(error => next(error))
  }
})

app.put("/api/persons/:id", (request, response, next) => {
  const { id } = request.params
  const { body } = request
  Person.findByIdAndUpdate(id, body, { runValidators: true, new: true }).then(personUpdated => {
    response.json(personUpdated)
  }).catch(error => next(error))
})

app.use((error, request, response, next) => {
  switch (error.name) {
    case 'ValidationError':
      return response.status(400).json({ error: error.message })
    case 'CastError':
      return response.status(400).json({ error: 'id malformed' })
    default: return response.status(500).send({ error: error.message })
  }
})

app.use((request, response) => {
  response.status(404).send({ error: "Unknown endpoint" })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
