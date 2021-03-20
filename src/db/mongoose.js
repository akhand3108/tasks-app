const mongoose = require("mongoose")

mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.DB_PASSWORD +
      "@tasks-app.amqff.mongodb.net/weather-app?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Connected to database"))
  .catch((e) => console.log(e))
