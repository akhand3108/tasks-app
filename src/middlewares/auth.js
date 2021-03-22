const jwt = require("jsonwebtoken")
const Users = require("../models/user")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, "thisissecret")
    const user = await Users.findOne({
      _id: decoded._id,
      "tokens.token": token,
    }).exec()

    if (!user) {
      throw new Error()
    }

    req.user = user
    req.token = decoded
    next()
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate" })
  }
}

module.exports = auth
