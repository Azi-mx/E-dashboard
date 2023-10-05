import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Signup() {
  //By using use state every detail is got in variables
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    

    //To check if the user have already signed up, the data from localstorage is got and checked so it will
    // navigate user to the '/' page
    useEffect(()=>{
      const auth = localStorage.getItem('user')
      if(auth){
        navigate('/')
      }
    },[])

    const collectData = async ()=>{
        console.warn(name,email,password)
        const res = {
          name:name,
          email:email,
          password:password
        }
        //Here api is integrated using fetch method and the data will only fetch when localhost is running on local
        let result = await fetch('https://e-dashborad.onrender.com/register',
        {
          method:'post',
          //We are using json.stringify just because we are send data so data should be in Json format
          //The data we got by using use state will be now sent to database for registration
          body:JSON.stringify({res}),
          headers:{
            'Content-type':'application/json'
          }
        })
        ///  .json() method is used to get data in proper format
        result = await result.json()
        console.log(result)
        // Here we are saving the users's data in localstorage  
        localStorage.setItem("user",JSON.stringify(result.Createuser))

          // Here we are saving that token in localstorage
        localStorage.setItem("token",JSON.stringify(result.auth))

        if(result){
          navigate('/')
        }
    }
  return (
    <div className='register'>
        <h1>Register</h1>
        // here values from input are get by using useState function
        <input className='inputBox' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your name'></input>
        <input className='inputBox' type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Id'></input>
        <input className='inputBox' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'></input>
        <button className='app-button' onClick={collectData}>Sign Up</button>
    </div>
  )
}
