const mongoose = require("mongoose");

mongoose
  .connect(process.env.NODE_ENV === "test" ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));
