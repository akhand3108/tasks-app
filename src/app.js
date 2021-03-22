require("dotenv").config()
const express = require("express")
require("./db/mongoose")
const usersRouter = require("./routers/user")
const tasksRouter = require("./routers/task")

const app = express()
app.use(express.json())

// Setting up routers
app.use("/users", usersRouter)
app.use("/tasks", tasksRouter)

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log("SERVER is UP on", PORT))
