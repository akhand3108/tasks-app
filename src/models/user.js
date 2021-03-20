const mongoose = require("mongoose")
const validator = require("validator")

const Users = mongoose.model("Users", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("Enter a valid Email Address")
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(password) {
      if (password.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain password")
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Enter a valid age (age>0)")
      }
    },
  },
})

module.exports = Users
