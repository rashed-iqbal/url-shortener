import React,{createContext, useEffect, useState} from 'react'

const UserContext = createContext()


function GetUser({children}) {

    let [user,setUser] = useState({})

    let [ip,setIp] = useState()

    let [ipUrl,setIpUrl] = useState()
    

    useEffect(()=>{
        checkUser()
    },[])

 
    function checkUser(){
        let cookie = document.cookie
        if(!cookie){
            return
        }
        let c = cookie.split('=')
        const token ={
            token:c[1]
        } 

        fetch('http://localhost:4000/auth/getuser',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(token)
        })
        .then(e=>e.json())
        .then(v=>{
            if(v.message === 'User Get Successfully'){
                setUser(v.rootUser) 
            }
        })
        .catch(e=>console.log(e))
    }

    let [getUrl,setGetUrl] = useState()

    function getShortUrl(url){
        if(url === '') return

        const data ={
            
            "originalUrl": url,
            "ip": ip
            
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
            setGetUrl(res)
        })
        .catch(e=>console.log(e))
    }

    if(ip && !ipUrl){

        let data = {
            ip
        }
        fetch('http://localhost:4000/getipurl',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(r=>r.json())
        .then(res=>{
            if(res.message === 'IpUrl found'){
                setIpUrl(res.ipUrl)
            }
        })
        .catch(e=>console.log(e))
    }

    // Handle Login Submit Fetch User
    function HandleLoginSubmit(data,history){
        

        fetch('http://localhost:4000/auth/login',{
            method:'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(e=>e.json())
        .then(v=>{
            if(v.message === 'Login Successfully'){
                setUser(v.user)
                history.push('/')
            }
              
        })
        .catch(e=>console.log(e))
    }


// function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
//     //compatibility for firefox and chrome
//     var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
//     var pc = new myPeerConnection({
//         iceServers: []
//     }),
//     noop = function() {},
//     localIPs = {},
//     ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

//     function iterateIP(ip) {
//         if (!localIPs[ip]) onNewIP(ip);
//         localIPs[ip] = true;
//     }

//      //create a bogus data channel
//     pc.createDataChannel("");

//     // create offer and set local description
//     pc.createOffer().then(function(sdp) {
//         sdp.sdp.split('\n').forEach(function(line) {
//             if (line.indexOf('candidate') < 0) return;
//             line.match(ipRegex).forEach(iterateIP);
//         });
        
//         pc.setLocalDescription(sdp, noop, noop);
//     }).catch(function(reason) {
//         // An error occurred, so handle the failure to connect
//     });

//     //listen for candidate events
//     pc.onicecandidate = function(ice) {
//         if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
//         ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
//     };
// }

// Usage

function getUserIP(){
    fetch('https://api.ipify.org?format=json',{headers:{'Accept':'application/json'}})
        .then(r=>r.json())
        .then(res=>{
            setIp(res.ip)
        })
};

if(!ip){
    getUserIP()
}


    return (
        <UserContext.Provider value={{
            HandleLoginSubmit,
            user,
            getUrl,
            getShortUrl,
            ipUrl,
            setUser
            }}>
                {children}
        </UserContext.Provider>
    )


    
}

export {GetUser,UserContext}
