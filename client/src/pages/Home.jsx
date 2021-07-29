import React,{useContext,useState} from 'react'
import mainLogo from '../img/main-logo.svg'

import {UserContext} from '../utils/GetUser'

function Home() {
    const {user,getShortUrl,getUrl,ipUrl} = useContext(UserContext)
    const [url,setUrl] = useState('')
    console.log(ipUrl)
    return (
        <div className='md:flex container mx-auto'>
            <div className="md:w-1/2 flex justify-center items-center md:mt-24">
                <img src={mainLogo} alt="" className='w-60 md:w-auto my-5 md:my-0 ' />
            </div>
            <div className="md:w-1/2 flex justify-center items-center  flex-col">
                <h1>Hello {user.name || 'Guest User'}</h1>
                <div>

                {/* {ipUrl ? <><input type="text" placeholder='Enter your long link..' className='border p-2 border' value={ ipUrl.ipUrl.originalUrl }  readOnly/> 

                <button className='m-2 p-2 bg-gray-600 text-white' disabled >Shrink</button></> :

                <><input type="text" placeholder='Enter your long link..' className='border p-2 border' value={url} onChange={(e)=>setUrl(e.target.value)} readOnly='true' /> 

                <button className='m-2 p-2 bg-gray-600 text-white' onClick={()=>getShortUrl(url)} >Shrink</button></>

                } */}

                <><input type="text" placeholder='Enter your long link..' className='border p-2 border' value={ipUrl ? ipUrl.originalUrl : url} onChange={(e)=>setUrl(e.target.value)} readOnly={ipUrl && true} /> 

                <button className='m-2 p-2 bg-gray-600 text-white' onClick={()=>getShortUrl(url)} disabled={ipUrl && true}>Shrink</button></>


                </div>
                {
                    getUrl && <a href={getUrl.shortUrl}>{getUrl.shortUrl}</a>
                }

                

            </div>
        </div>
    )
}

export default Home
