const express = require('express')
const Recipient = require('../models/recipient')
var cors = require('cors');
const router = new express.Router()

const app = express()
app.use(cors());

router.post('/addRecipient', cors(), async (req, res) => {
    const recipient = new Recipient(req.body)
    try {
        await recipient.save()
        res.status(201).send(recipient)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/allRecipient', async (req, res) => {
    const user_id = req.query.user_id
    console.log(user_id)
    try {
        let recipients = await Recipient.find();
        res.send(recipients)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router


