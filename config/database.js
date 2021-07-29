const mongoose = require('mongoose')

module.exports = (callback)=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    })
    .then(callback())
    .catch(e=>{
        console.error(e)
        process.exit(1)
    })
}