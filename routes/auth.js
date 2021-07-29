const router = require('express').Router()
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res)=>{
    
    try {
        let {name,email,password} = req.body

        if(!name || !email || !password){
            throw new Error('Please input all field are required!')
        }

        let user = await User.findOne({email})

        if(user){
            throw new Error('User already exist')
        }

        password = bcrypt.hashSync(password,10)

        await User.create({name,email,password})

        res.status(201).json({message:'User Created Successfully'})

    } catch (error) {
        res.json({error:error.message})
    }

})


router.post('/login',async(req,res)=>{
    try {
        let {email,password} = req.body

        if(!email,!password){
            throw new Error('Please input all field are required!')
        }

        let user = await User.findOne({email})

        if(!user){
            throw new Error('Invalid Credentials n')
        }

        let pass_match = bcrypt.compareSync(password,user.password)

        if(!pass_match){
            throw new Error('Invalid Credentials p')
        }

        const token = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN)

        res.cookie('verify',token,{
            expires: new Date(Date.now() + 864000000),
            httpOnly:false
        })

        user.tokens = user.tokens.concat({token})

        await User.updateOne({_id:user.id},{$set:user})

        res.status(201).json({message:'Login Successfully'})
        
    } catch (error) {
        res.json({error:error.message})
    }
})



router.post('/getuser',async(req,res)=>{
    let ip = req.ip
    try {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEzNTM4ZDQ3YTc3ZTE3ZTAxOTAzMjgiLCJpYXQiOjE2MjE2MjYzMDd9.PVq41b-L2LYAM2bM3q-Du-lRanK73uQpy-iIPV_DWQI';

        // const token = req.cookies.verify;
        const {token} = req.body;

        if(!token){
            throw new Error('Please input all field are required!')
        }

        const verifyToken = jwt.verify(token,process.env.SECRET_TOKEN)

        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})
        
        if(!rootUser){
            throw new Error('Please input all field are required!')
        }

        res.json({message:'User Get Successfully',rootUser,ip})

        // let user = await User.findOne({email})

        // if(!user){
        //     throw new Error('Invalid Credentials n')
        // }

        // let pass_match = bcrypt.compareSync(password,user.password)

        // if(!pass_match){
        //     throw new Error('Invalid Credentials p')
        // }

        // const token = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN)

        // res.cookie('verify',token,{
        //     expires: new Date(Date.now() + 864000000),
        //     httpOnly:false
        // })

        // user.tokens = user.tokens.concat({token})

        // await User.updateOne({_id:user.id},{$set:user})

        // res.status(201).json({message:'Login Successfully',user})
        
    } catch (error) {
        res.json({error:error.message,ip})
    }
})

module.exports = router