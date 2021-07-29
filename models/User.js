const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:String
        }
    ],
    links:[
        {
            originalUrl:String,
            shortUrl:String,
        }
    ]
    
})

module.exports = model('User',userSchema)