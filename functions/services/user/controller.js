const db = require('../../utils/admin')
const router = require('express').Router();
const Model = require('./model')
// const app = require('../../index')
router.post("/createUser", (req, res) => {
    const obj = new Model()
    return obj._createUser(req.body).then(() => {
        return res.status(201).json({ message: `user created successfully` })
    }).catch(() => {
        return res.status(401).json({ message: `failed` })
    })
})
router.get("/getUser/:id", (req, res) => {
    const { id } = req.params
    const obj = new Model()
    return obj._getUser(id).then((user) => {
        return res.status(200).json(user)
    }).catch((err) => {
        return res.status(400).json({ message: 'failed to get user' })
    })
})
router.get("/getUsers", (req, res) => {
    const obj = new Model()
    return obj._getUsers().then((users) => {
        console.log(users)
        return res.status(201).json(users)
    }).catch((err) => {
        return res.status(400).json({ message: "couldn't get" })
    })
})
router.put("/updateUser/:id", (req, res) => {
    const { id } = req.params
    const inputs = req.body
    const obj = new Model()
    return obj._updateUser(id, inputs).then((users) => {
        return res.status(201).json(users)
    }).catch((err) => {
        return res.status(400).json({ message: "couldn't update" })
    })
})
router.delete("/deleteUser/:id", (req, res) => {
    const { id } = req.params
    const obj = new Model()
    return obj._deleteUser(id).then(() => {
        return res.status(201).json({ message: 'user deleted' })
    }).catch((err) => {
        return res.status(400).json({ message: "couldn't delete" })
    })
})
module.exports = router