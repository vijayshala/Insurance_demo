const express = require('express')
const User = require('../models/policy')
var cors = require('cors');
const router = new express.Router()

const app = express()
app.use(cors());

router.post('/polices', cors(), async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/allPolices', async (req, res) => {
    try {
        let users = await User.find();
        const successToken = users ? "true" : "false" ;
        res.send({successToken ,  users})
    } catch (e) {
        res.status(400).send({successToken})
    }
})

router.get('/polices/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/searchPolicies', async (req, res) => {
    const disabled_person = req.query.disabled_person
    const medical_history = req.query.medical_history
    try {
        let user = await User.find({disabled_person,medical_history });
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})


router.patch('/polices/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/polices/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router


