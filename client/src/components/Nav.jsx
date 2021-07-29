import React, { useState ,useContext} from "react";
import userLogo from "../img/user-logo.png";
import logo from "../img/logo.svg";

import { Link ,useHistory} from "react-router-dom";

import {UserContext} from '../utils/GetUser'

function Nav({ user }) {
  const [show, setShow] = useState(false);

  const history = useHistory()
  const {setUser} = useContext(UserContext)

  const handleShow = () => {
    setShow(!show);
  };

  const handleLogout = ()=>{
   document.cookie = "verify=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   history.push('/auth/login')
   setUser({})
  }

  const handleLinks = ()=>{
     setShow(false)
     history.push('/links')
  }
  

  return (
    <>

        <div className='absolute flex w-full h-full ' style={{zIndex:-2}}>
            <div className="w-1/2 md:bg-blue-50"></div>
            <div className="w-1/2 "></div>
        </div>

    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between p-5">
        <div className="flex items-center">
          <img src={logo} alt="" height={40} width={40}/>
          <span>Url Shortener</span>
        </div>

        <ul className="hidden md:flex items-center">
          <li className="inline-block cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="inline-block my-line ml-3"></li>
          <li className="inline-block ml-3 cursor-pointer">
            <Link to="/statistics">Statistics</Link>
          </li>
          <li className="inline-block my-line ml-3"></li>
          <li className="inline-block ml-3 cursor-pointer">
            <Link to="/pricing">Pricing</Link>
          </li>
          <li className="inline-block my-line ml-3"></li>
          {user.name ? (
            <li className="inline-block ml-3  relative">
              <div className="flex items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="4"
                  viewBox="0 0 6 4"
                >
                  <g
                    id="Polygon_1"
                    data-name="Polygon 1"
                    transform="translate(6 4) rotate(180)"
                    fill="#707070"
                  >
                    <path
                      d="M 5 3.5 L 1 3.5 L 3 0.8333333134651184 L 5 3.5 Z"
                      stroke="none"
                    />
                    <path
                      d="M 3 1.666666746139526 L 2 3 L 4 3 L 3 1.666666746139526 M 3 0 L 6 4 L 0 4 L 3 0 Z"
                      stroke="none"
                      fill="#707070"
                    />
                  </g>
                </svg>
                <span
                  onClick={handleShow}
                  className=" h-10 w-10 bg-purple-300 rounded-full flex justify-center items-center"
                >
                  <img src={userLogo} alt="" height={24} width={24} />
                </span>
              </div>
              {show ? (
                <>
                  <div className="absolute top-11 right-0 h-60 w-64 bg-gray-100 z-10 shadow-md border">
                  <div className="flex justify-between h-18 items-center p-3">
                      <div className="h-10 w-10 bg-purple-300 rounded-full flex justify-center items-center">
                        <img src={userLogo} alt="" height={24} width={24} />
                      </div>
                      <div className="name-email">
                         <h2 className='font-bold text-gray-500'>{user.name}</h2>
                         <p className='text-sm'>{user.email}</p>
                        <button className='px-1.5  border text-sm rounded-lg hover:border-gray-500'>Edit Profile</button>
                      </div>
                      
                  </div>
                     <div className='bg-gray-500 h-px mx-3'></div>

                     <div onClick={handleLinks} className="test mt-2 h-8 p-3 flex items-center justify-between cursor-pointer hover:bg-white">
                        <div className='flex items-center'>
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 511.997 511.997"
                              height={20}
                              width={20}
                           >
                              <path d="M212.26 390.24l-60.331 60.331c-25.012 25.012-65.517 25.012-90.508.005-24.996-24.996-24.996-65.505-.005-90.496l120.683-120.683c24.991-24.992 65.5-24.992 90.491 0 8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17-41.654-41.654-109.177-41.654-150.831 0L31.247 329.909c-41.654 41.654-41.654 109.177 0 150.831 41.649 41.676 109.177 41.676 150.853 0l60.331-60.331c8.331-8.331 8.331-21.839 0-30.17s-21.84-8.33-30.171.001z" />
                              <path d="M480.751 31.24c-41.654-41.654-109.199-41.654-150.853 0l-72.384 72.384c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l72.384-72.384c24.991-24.992 65.521-24.992 90.513 0 24.991 24.991 24.991 65.5 0 90.491L317.845 284.638c-24.992 24.992-65.5 24.992-90.491 0-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17c41.654 41.654 109.177 41.654 150.831 0l132.736-132.736c41.654-41.654 41.654-109.178 0-150.832z" />
                           </svg>
                        <p className='ml-3'>Links</p>
                        </div>
                           <p >{user.links.length}/20</p>            
                     </div>

                     <div className="test h-8 p-3 flex items-center cursor-pointer hover:bg-white">
                                          <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 330 330" >
                           <path d="M165 .008C74.019.008 0 74.024 0 164.999c0 90.977 74.019 164.992 165 164.992s165-74.015 165-164.992C330 74.024 255.981.008 165 .008zm0 299.984c-74.439 0-135-60.557-135-134.992S90.561 30.008 165 30.008s135 60.557 135 134.991c0 74.437-60.561 134.993-135 134.993z" />
                           <path d="M165 130.008c-8.284 0-15 6.716-15 15v99.983c0 8.284 6.716 15 15 15s15-6.716 15-15v-99.983c0-8.283-6.716-15-15-15zM165 70.011c-3.95 0-7.811 1.6-10.61 4.39-2.79 2.79-4.39 6.66-4.39 10.61s1.6 7.81 4.39 10.61c2.79 2.79 6.66 4.39 10.61 4.39s7.81-1.6 10.609-4.39c2.79-2.8 4.391-6.66 4.391-10.61s-1.601-7.82-4.391-10.61A15.12 15.12 0 00165 70.011z" />
                        </svg>
                        <p className='ml-3'>About Us</p>
                     </div>

                     <div className='bg-gray-500 h-px mx-3 my-2'></div>

                     <div className="test h-8 p-3 flex items-center cursor-pointer hover:bg-white" onClick={handleLogout}>
                     <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 384.971 384.971"
                           height={20}
                           width={20}
                        >
                           <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
                           <path d="M381.481 184.088l-83.009-84.2a11.942 11.942 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0017.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
                        </svg>
                        <p className='ml-3'>Logout</p>
                     </div>
                  </div>
                  <div
                    className="fixed top-0 bottom-0 left-0 right-0"
                    onClick={() => setShow(false)}
                  ></div>
                </>
              ) : null}
            </li>
          ) : (
            <li className="inline-block px-3 py-2 bg-purple-700 ml-3 rounded-lg  cursor-pointer">
              <Link to="/auth">Join Now</Link>
            </li>
          )}
        </ul>
        {user.name ? (
          <div className="md:hidden flex items-center relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="4"
              viewBox="0 0 6 4"
            >
              <g
                id="Polygon_1"
                data-name="Polygon 1"
                transform="translate(6 4) rotate(180)"
                fill="#707070"
              >
                <path
                  d="M 5 3.5 L 1 3.5 L 3 0.8333333134651184 L 5 3.5 Z"
                  stroke="none"
                />
                <path
                  d="M 3 1.666666746139526 L 2 3 L 4 3 L 3 1.666666746139526 M 3 0 L 6 4 L 0 4 L 3 0 Z"
                  stroke="none"
                  fill="#707070"
                />
              </g>
            </svg>
            <div
              className=" h-10 w-10 bg-purple-300 rounded-full flex justify-center items-center"
              onClick={handleShow}
            >
              <img src={userLogo} alt="" height={24} width={24} />
            </div>
            {show ? (
              <>
                <div className="absolute top-11 right-0 h-72 w-64 bg-gray-100 z-10 shadow-md border">
                <div className="flex justify-between h-18 items-center p-3">
                      <div className="h-10 w-10 bg-purple-300 rounded-full flex justify-center items-center">
                        <img src={userLogo} alt="" height={24} width={24} />
                      </div>
                      <div className="name-email">
                         <h2>{user.name}</h2>
                         <p className='text-sm'>{user.email}</p>
                        <button className='px-1.5  border text-sm rounded-lg hover:border-gray-500'>Edit Profile</button>
                      </div>
                      
                  </div>
                  <div className='bg-gray-500 h-px mx-3'></div>

                     <div onClick={handleLinks} className="test mt-2 h-8 p-3 flex items-center justify-between cursor-pointer hover:bg-white">
                        <div className='flex items-center'>
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 511.997 511.997"
                              height={20}
                              width={20}
                           >
                              <path d="M212.26 390.24l-60.331 60.331c-25.012 25.012-65.517 25.012-90.508.005-24.996-24.996-24.996-65.505-.005-90.496l120.683-120.683c24.991-24.992 65.5-24.992 90.491 0 8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17-41.654-41.654-109.177-41.654-150.831 0L31.247 329.909c-41.654 41.654-41.654 109.177 0 150.831 41.649 41.676 109.177 41.676 150.853 0l60.331-60.331c8.331-8.331 8.331-21.839 0-30.17s-21.84-8.33-30.171.001z" />
                              <path d="M480.751 31.24c-41.654-41.654-109.199-41.654-150.853 0l-72.384 72.384c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l72.384-72.384c24.991-24.992 65.521-24.992 90.513 0 24.991 24.991 24.991 65.5 0 90.491L317.845 284.638c-24.992 24.992-65.5 24.992-90.491 0-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17c41.654 41.654 109.177 41.654 150.831 0l132.736-132.736c41.654-41.654 41.654-109.178 0-150.832z" />
                           </svg>
                        <p className='ml-3'>Links</p>
                        </div>
                           <p >{user.links.length}/20</p>            
                     </div>

                     <div className="test h-8 p-3 flex items-center cursor-pointer hover:bg-white">
                                          <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 330 330" >
                           <path d="M165 .008C74.019.008 0 74.024 0 164.999c0 90.977 74.019 164.992 165 164.992s165-74.015 165-164.992C330 74.024 255.981.008 165 .008zm0 299.984c-74.439 0-135-60.557-135-134.992S90.561 30.008 165 30.008s135 60.557 135 134.991c0 74.437-60.561 134.993-135 134.993z" />
                           <path d="M165 130.008c-8.284 0-15 6.716-15 15v99.983c0 8.284 6.716 15 15 15s15-6.716 15-15v-99.983c0-8.283-6.716-15-15-15zM165 70.011c-3.95 0-7.811 1.6-10.61 4.39-2.79 2.79-4.39 6.66-4.39 10.61s1.6 7.81 4.39 10.61c2.79 2.79 6.66 4.39 10.61 4.39s7.81-1.6 10.609-4.39c2.79-2.8 4.391-6.66 4.391-10.61s-1.601-7.82-4.391-10.61A15.12 15.12 0 00165 70.011z" />
                        </svg>
                        <p className='ml-3'>About Us</p>
                     </div>

                     <div className='bg-gray-500 h-px mx-3 my-2'></div>

                     <div className="test h-8 p-3 flex items-center cursor-pointer hover:bg-white" onClick={handleLogout}>
                     <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 384.971 384.971"
                           height={20}
                           width={20}
                        >
                           <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
                           <path d="M381.481 184.088l-83.009-84.2a11.942 11.942 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0017.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
                        </svg>
                        <p className='ml-3'>Logout</p>
                     </div>

                </div>
                <div
                  className="fixed top-0 bottom-0 left-0 right-0"
                  onClick={() => setShow(false)}
                ></div>
              </>
            ) : null}
          </div>
        ) : (
          <Link
            to="/auth"
            className="md:hidden inline-block px-3 py-2 bg-purple-700 ml-3 rounded-lg"
          >
            Join Now
          </Link>
        )}
      </div>

      <div className="md:hidden absolute bottom-0 bg-white w-full  flex justify-around p-2 bg-gray-300">
        <Link to="/" className=" px-3 py-2 bg-purple-700 ml-3 rounded-lg">
          Home
        </Link>
        <Link
          to="/statistics"
          className=" px-3 py-2 bg-purple-700 ml-3 rounded-lg"
        >
          Statistics
        </Link>
        <Link to="/pricing" className="px-3 py-2 bg-purple-700 ml-3 rounded-lg">
          Pricing
        </Link>
      </div>
    </div>
    </>
  );
}

export default Nav;
