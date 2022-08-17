const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const auth = require('./middleware/auth')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.get('/', (req, res) => {
    try {
        res.status(200).send('Everything is fine')
    } catch (e) {
        res.status(400).send()
    }

})


app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
