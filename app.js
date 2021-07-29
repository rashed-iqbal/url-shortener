require('dotenv').config() // DotENV config
const express = require('express')
const app = express()
const connectDB = require('./config/database') // Database
const cors = require('cors')

//MiddleWares
const middleWares = [
    express.json(),
    express.urlencoded({extended:false}),
    cors({origin:true,credentials:true})
]
app.use(middleWares)

// Routes
app.use('/auth',require('./routes/auth'))
app.use('/',require('./routes/url'))

connectDB(()=>{
    app.listen(process.env.PORT,console.log('Server & Database are Connected...'))
})


