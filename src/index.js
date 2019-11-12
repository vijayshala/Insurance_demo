const express = require('express')
var cors = require('cors');
require('./db/mongoose')
const userRouter = require('./routers/user')
const policyRouter = require('./routers/policy')
 

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

app.use(userRouter)
app.use(policyRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
