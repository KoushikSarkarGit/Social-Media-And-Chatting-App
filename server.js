const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
require('dotenv').config()
const UserRoute = require('./Routes/UserRoute')

const PostRoute = require('./Routes/PostRoute')

const CommentRoute = require('./Routes/CommentRoute')



const port = 9000
const mongouri = process.env.mongo_uri



//middlewares
app.use(express.json())
app.use(cors())


// routes

app.use('/api/v1/user', UserRoute)
app.use('/api/v1/post', PostRoute)
app.use('/api/v1/comments', CommentRoute)

//mongodb connection

const connectMongoDB = async () => {
    try {

        await mongoose.connect(mongouri);
        console.log('connected to social media app data base')

    } catch (error) {
        console.log('some error occured during the connection to data base', error)
    }
}



connectMongoDB().then(() => {

    app.listen(port, () => {
        console.log(`running social media server on port no ${port}`);
    })

})

