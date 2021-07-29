import React,{useState} from 'react'
import logo from '../img/logo.svg'
import {Link,useHistory} from 'react-router-dom'
import backLogo from '../img/back-track.svg'
import register from '../img/register.svg'

function Register() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState({})

    const history = useHistory()

    const handleRegisterSubmit = (e) =>{
        e.preventDefault()

        let err = {}
        

        if(!firstName || !lastName || !email || !password || !confirmPassword){
            err.error = 'Please Full fil all field'
            
        }


        if(err.error){
            return setErrors(err)
        }

        const data = {
            name: firstName +' '+ lastName,
            email,
            password
        }
    

        fetch('http://localhost:4000/auth/register',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
            .then(e=>e.json())
            .then(v=>{
                
                if(v.message === 'User Created Successfully'){
                    history.push('/auth/login')
                }else if(v.error){
                    console.log(v)
                }
                
            })
            .catch(e=>console.log(e))
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
                <img src={register} alt="" className='w-60 md:w-auto my-5 md:my-0 md:p-10' />
            </div>

                <div className="md:w-1/2 w-full flex justify-center items-center flex-col px-10">
                        <h1 className='text-5xl font-bold text-gray-700 mb-10'>Register</h1>
                    
                        <form onSubmit={handleRegisterSubmit}>
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder='First Name' value={firstName} onChange={e=>setFirstName(e.target.value)}/>

                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder='Last Name' value={lastName} onChange={e=>setLastName(e.target.value)}/>
                        <br />
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}/>
                        <br />
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter Password' value={password} onChange={e=>setPassword(e.target.value)}/>
                        
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>


                        <br />
                        <button type='submit'>Register</button>
                    </form>
                    <p>Already have an Account? <Link to='/auth/login'>Login</Link></p>
                    {errors.error ? <p>{errors.error}</p> : null}
            </div>
        </div>
        
        </>
    )
}

export default Register



