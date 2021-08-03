const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personSchema = Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true
    }
})

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = model("Person", personSchema);

module.exports = Person;
