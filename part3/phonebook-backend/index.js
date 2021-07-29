const { request } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

morgan.token("body", function getBody(request) {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", number: "39-23-6423122" },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number.parseInt(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number.parseInt(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const { body } = request;
  if (
    body.name === undefined ||
    body.name === null ||
    body.name === "" ||
    body.number === undefined ||
    body.number === null ||
    body.number === ""
  ) {
    response.status(400).end();
  } else {
    const personExists = persons.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    );
    if (personExists) {
      response
        .status(409)
        .send({ error: `${body.name} already exists in the phonebook.` });
    } else {
      body.id = Math.floor((Math.random() * (10000 - 1) + 1) * 10000);
      response.json(body);
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
