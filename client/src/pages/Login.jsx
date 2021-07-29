import React,{useContext, useState} from 'react'
import logo from '../img/logo.svg'
import {Link,useHistory} from 'react-router-dom'
import backLogo from '../img/back-track.svg'
import login from '../img/login.svg'

import {UserContext} from '../utils/GetUser'

function Login() {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const {HandleLoginSubmit} = useContext(UserContext)

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!email || !password){
            return
        }

        const data = {
            email,password
        }
        HandleLoginSubmit(data,history)
    }



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
                <img src={login} alt="" className='w-60 md:w-auto my-5 md:my-0 md:p-10' />
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center flex-col ">
                        <h1 className='text-5xl font-bold text-gray-700 mb-10'>Login</h1>
                    
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)} />
                        <br />
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter Password' value={password} onChange={e=>setPassword(e.target.value)} />
                        <br /> 
                        <button type='submit'>Login</button>
                    </form>
                    <p>Haven't an Account? <Link to='/auth/register'>Register</Link></p>
            </div>
        </div>
        
        </>
    )
}

export default Login


