import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'


function Links({user}) {

    const history = useHistory()

    if(!user.name){
        history.push('/')
    }

    const [originalUrl,setOriginalUrl] = useState('')
    const [shortUrl,setShortUrl] = useState('')
    const [available,setAvailable] = useState()

    let [links,setLinks] = useState(user.links || [])

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!originalUrl) return

        let data;
        if(shortUrl){
            if(!available || available === 'Unavailable' || shortUrl.includes(' ')) return
            if(available === 'Available'){
                data = {
                    userId:user._id,
                    originalUrl,
                    shortUrl:shortUrl.toLowerCase()
                }
            }

        } else {
            data = {
                userId:user._id,
                originalUrl
            }
        }


        fetch('http://localhost:4000/url',{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)

        })
        .then(r=>r.json())
        .then(res=>{

            setOriginalUrl('')
            setShortUrl('')
            setAvailable(undefined)

            setLinks(res)
        })
        .catch(e=>console.log(e))

    }


    const checkUrl = (e)=>{
        e.preventDefault()
        if(shortUrl === '') return

        let data = {
            shortUrl
        }

        fetch('http://localhost:4000/check-url',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(r=>r.json())
        .then(res=>setAvailable(res))
        .catch(e=>console.log(e))

    }

    const handleChangeShort = (e)=>{
        if(originalUrl === '') return
        setAvailable(undefined)
        setShortUrl(e.target.value)
    }

    
    const handleChangeOri = (e)=>{
        setOriginalUrl(e.target.value)
    }
    

    return (
        <div className='container mx-auto px-5'>
            <h1>Links</h1>
            <button>Add Link</button>

            <form onSubmit={handleSubmit}>
                <label htmlFor="">Original Url</label>
                <input type="text" onChange={handleChangeOri} value={originalUrl}/> <br />
                <label htmlFor="">Short Url</label>
                <input type="text" onChange={handleChangeShort} value={shortUrl} />
                <br />
                <button onClick={checkUrl}>Check</button>
                {available && available}
                <br />
                <button type='submit'>Add</button>
            </form>
            <div className="w-full">
                {links.map(v=>(
                    <h1 key={v._id}>Original Url : {v.originalUrl}, Short Url:{v.shortUrl}</h1>
                ))}
            </div>
        </div>
    )
}

export default Links
