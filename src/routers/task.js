const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


// GET /tasks?completed=false
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort = {}

    if (req.query.completed) {
        // match.completed = req.query.completed
        match.completed = req.query.completed === "true"
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        const sortCriteria = parts[0]
        const sortOrder = parts[1] === "desc" ? -1 : 1
        sort[sortCriteria] = sortOrder
    }

    try {
        // Different ways of finding tasks: populate or find
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                // limit: req.query.limit
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id

    try {
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })
        // const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {

    // Validate request properties (optional)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => { return allowedUpdates.includes(update) })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    const _id = req.params.id
    try {
        const updatedTask = await Task.findOne({
            _id,
            owner: req.user._id
        })
        if (!updatedTask) {
            return res.status(404).send()
        }

        updates.forEach((update) => updatedTask[update] = req.body[update])
        await updatedTask.save()
        res.send(updatedTask)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const deletedTask = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if (!deletedTask) {
            return res.status(404).send()
        }
        res.send(deletedTask)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router