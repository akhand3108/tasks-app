const router = require("express").Router()
const Users = require("../models/user")
const auth = require("../middlewares/auth")

router.get("/me", auth, async (req, res) => {
  res.send(req.user)
})

router.post("/", async (req, res) => {
  try {
    const user = new Users(req.body)

    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    )
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).exec()
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["name", "email", "age", "password"]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" })
  }

  try {
    const user = await Users.findById(req.params.id)
    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save()

    if (!user) {
      res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id).exec()
    if (!user) {
      res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
