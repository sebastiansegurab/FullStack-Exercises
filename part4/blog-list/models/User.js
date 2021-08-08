const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v
    delete returnedObject.password;
  },
});

module.exports = model("User", userSchema);
