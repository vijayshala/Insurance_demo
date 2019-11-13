const express = require('express')
const User = require('../models/user')
var cors = require('cors');
const router = new express.Router()

const app = express()
app.use(cors());

router.post('/users', cors(), async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    
    const email = req.query.email
    const password = req.query.password
 
    try {
        let users = await User.findOne({password});
        const successToken = users ? "true" : "false" ;
        //res.send(users ? "success : true" : "success : false" , users );
        res.send({successToken ,  users})
        //res.status(500).send(users ? "success : true" : "success : false" , users);
    } catch (e) {
        res.status(400).send({successToken})
    }
})

router.get('/allUsers', async (req, res) => {
    try {
        let users = await User.find();
        res.send(users)
    } catch (e) {
        res.status(400).send({successToken})
    }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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


