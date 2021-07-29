const {Schema,model} = require('mongoose')

const urlSchema = new Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    },
    expires:{
        type:String,
        required:true
    },
    clicks:Number
})

module.exports = model('Url',urlSchema)