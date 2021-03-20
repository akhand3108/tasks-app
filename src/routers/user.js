const router = require("express").Router()
const Users = require("../models/user")

router.get("/", async (req, res) => {
  try {
    const users = await Users.find({}).exec()
    res.send(users)
  } catch (error) {
    res.status(500).send()
  }
})

router.get("/_id", async (req, res) => {
  try {
    const { _id } = req.params
    const user = await (await Users.findById(_id)).exec()
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
