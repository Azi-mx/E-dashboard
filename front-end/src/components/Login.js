import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
// Comments are already done on Signup.js
export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    let navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
          navigate('/')
        }
      },[])
    const handlelogin = async ()=>{
        console.log(email,password);
        let result = await fetch('https://e-dashborad.onrender.com/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-type':'application/json'
              }
        })
        result = await result.json();
        console.log(result);
        //Here we are matching the token = auth 
        if(result.auth){

            //user details are in the user object now
            localStorage.setItem("user",JSON.stringify(result.user));

          // Here we are saving that token in localstorage
            localStorage.setItem("token",JSON.stringify(result.auth));
            
            navigate('/')
        }
        else{
            alert('Please Enter Correct Details');
        }

    }
    
  return (
    <div className='login'>
        <h1>Log In Page</h1>
        <input className='inputBox' onChange={(e)=>setEmail(e.target.value)} value={email}placeholder='Enter Email'
         type='text'/>
        <input className='inputBox' onChange={(e)=>setPassword(e.target.value)} value={password} 
        placeholder='Enter Password' type='text'/>
        <button className='app-button' onClick={handlelogin}>Log In</button>
    </div>
  )
}
