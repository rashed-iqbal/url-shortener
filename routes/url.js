const router = require('express').Router()
const shortid = require('shortid')
const Url = require('../models/Url')
const Ip = require('../models/Ip')
const User = require('../models/User')

router.post('/url',async (req,res)=>{

    try {
        let {userId,originalUrl,shortUrl,ip} = req.body

        if(!originalUrl) throw new Error('Please input url')

        if(shortUrl){
            const checkShortUrl = await Url.findOne({shortUrl})

            if(checkShortUrl) throw new Error('Unavailable')

            if(ip){
                await Ip.create({ip,originalUrl,shortUrl:shortUrl.toLowerCase()})
            }


            const user = await User.findById(userId)
            if(!user) throw new Error('User Not Found')
            
            const links = user.links

            if(links.length === 20 ) throw new Error('Limit End')

            links.push({
                originalUrl,
                shortUrl
            })

            await User.updateOne({_id:userId},{$set:{
                links
            }})

            res.json(links) 
            
        } else {
            shortUrl = shortid.generate()

            if(ip){
                await Ip.create({ip,originalUrl,shortUrl:shortUrl.toLowerCase()})
            }

            
            const user = await User.findById(userId)
            if(!user) throw new Error('User Not Found')
            
            const links = user.links

            if(links.length === 20 ) throw new Error('Limit End')

            links.push({
                originalUrl,
                shortUrl
            })

            await User.updateOne({_id:userId},{$set:{
                links
            }})

            res.json(links) 

        }

        
    } catch (error) {
        res.json({message:error.message})
    }

})


router.post('/check-url',async (req,res)=>{
    
    try {
        const {shortUrl} = req.body
        if(!shortUrl) throw new Error('Enter short Url')
        const url = await User.findOne({"links.shortUrl":shortUrl})
        if(url) throw new Error('Unavailable')

        res.json('Available')
        
    } catch (error) {
        res.json(error.message)
    }

})

router.post('/getipurl',async (req,res)=>{

    try {

        const {ip} = req.body
        if(!ip) throw new Error('Ip not found')

        const ipUrl = await Ip.findOne({ip})

        if(!ipUrl) throw new Error('IpUrl not Found')

        res.json({message:'IpUrl found',ipUrl})


    } catch (error) {
        res.json({message:error.message})
    }

    


})

router.get('/:url',async (req,res)=>{

    try {
        const shortUrl = req.params.url

        let url = await Ip.findOne({shortUrl})

        if(!url){
            let user = await User.findOne({"links.shortUrl":shortUrl})
            url = user.links.find(v=> v.shortUrl === shortUrl)
        }
        console.log(url)

        if(!url) throw new Error('Url not found')

        const originalUrl = url.originalUrl

        res.redirect(originalUrl)
        
    } catch (error) {
        res.json({message:error.message})
    }
    
})

module.exports = router