import React from 'react'
import logo from '../img/logo.svg'
import {Link,useHistory} from 'react-router-dom'
import backLogo from '../img/back-track.svg'
import auth from '../img/auth.svg'

function Auth() {
    const history = useHistory()
    return (
        <>
        <div className='absolute flex w-full h-full ' style={{zIndex:-2}}>
            <div className="w-1/2 md:bg-blue-50"></div>
            <div className="w-1/2 "></div>
        </div>

        <div className="container mx-auto flex justify-between p-5">
            <div className="flex items-center cursor-pointer">
                    <img src={logo} alt="" height={40} width={40}/>
                    <span className='ml-2 text-lg font-bold text-gray-700'>Url Shortener</span>
            </div>
            <div className="flex items-center cursor-pointer" onClick={()=>history.push('/')}>
                    <img src={backLogo} alt="" height={24} width={24} />
                    <span className='ml-2'>Go Home</span>
            </div>
        </div>

        <div className="container mx-auto md:flex ">
            <div className="md:w-1/2 w-full flex justify-center items-center">
                <img src={auth} alt="" className='w-60 md:w-auto my-5 md:my-0 md:p-10' />
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center flex-col ">
                        <h1 className='text-5xl font-bold text-gray-700 mb-10'>Welcome Back</h1>
                    
                    <Link to='/auth/login'>Login</Link> 
                    <Link to='/auth/register'>Register</Link>
            </div>
        </div>
        
        </>
    )
}

export default Auth

