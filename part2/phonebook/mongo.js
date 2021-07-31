const mongoose = require("mongoose");

const url = `mongodb+srv://sebs19:<password>@cluster0.uujbx.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (
  process.argv[3] !== null &&
  process.argv[4] !== null &&
  process.argv[3] !== undefined &&
  process.argv[4] !== undefined &&
  process.argv[3].trim() !== "" &&
  process.argv[4].trim() !== ""
) {
  console.log(process.argv[3]);
  console.log(process.argv[4]);
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(
      "added " +
        process.argv[3] +
        " number " +
        process.argv[4] +
        " to phonebook"
    );
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}
