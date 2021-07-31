const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("build"));
const cors = require("cors");
app.use(cors());

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(result => {
  console.log("Connected to MongoDB")
}).catch(error => {
  console.log("Error connecting to MongoDB: ", error.message)
});

const personSchema = mongoose.Schema({
  name: String,
  number: String
}, {
  bufferCommands: false
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model("Person", personSchema);

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get("/api/persons/info", (request, response) => {
  Person.count({}, function (err, count) {
    response.status(200).json({ message: `Phonebook has info for ${count} people ${new Date()}` })
  })

});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  if (id.length < 24) {
    response.status(400).json({ error: "Bad request." })
  } else {
    Person.findById(id).then(person => {
      if (person) {
        response.json(person)
      } else {
        return response.status(404).json({ error: "Person doesn't exists" })
      }
    }).catch(error => {
      console.log("Error finding person: ", error.message)
    })
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  if (id.length < 24) {
    response.status(400).json({ error: "Bad request." })
  } else {
    Person.findByIdAndRemove(id).then(result => {
      if (result) {
        response.status(200).json({ message: "Person removed" })
      } else {
        return response.status(404).json({ error: "Person doesn't exists" })
      }
    }).catch(error => {
      console.log("Error: ", error.message)
    })
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
    response.status(400).json({ error: "Content missing." }).end();
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
        })
      }
    }).catch(error => {
      response.status(500).json({ error: error.message }).end()
    })
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
