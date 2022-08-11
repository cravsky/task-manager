const mongoose = require('mongoose')

const dbURL = process.env.MONGODB_URL

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    // useCreateIndex: true  // Deprecated in Mongoose 6.x.x
    useUnifiedTopology: true // Comes with Mongoose 6.x.x
})
