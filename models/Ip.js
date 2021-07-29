const {Schema,model} = require('mongoose')

const ipSchema = new Schema({
    ip:{
        type:String,
        required:true
    },
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    }
})

module.exports = model('IpUrl',ipSchema)