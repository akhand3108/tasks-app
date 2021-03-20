const router = require("express").Router()
const Tasks = require("../models/task")

router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find({}).exec()
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

router.post("/", async (req, res) => {
  const task = new Tasks(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { _id } = req.params
    const task = await Tasks.findById(req.params.id).exec()
    if (!task) {
      return res.status(404).send("")
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Update" })
  }

  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id).exec()
    if (!task) {
      res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
