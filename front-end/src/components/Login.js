import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Comments are already done on Signup.js
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  }, [])
  const handlelogin = async () => {
    console.log(email, password);
    let result = await fetch('https://e-dashboard-x01t.onrender.com/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    result = await result.json();
    console.log(result);
    //Here we are matching the token = auth 
    if (result.auth) {

      //user details are in the user object now
      localStorage.setItem("user", JSON.stringify(result.user));

      // Here we are saving that token in localstorage
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate('/')
    }
    else {
      alert('Please Enter Correct Details');
    }

  }

  return (

    <div className='login'>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <img src="images/download.png" alt="Image" className="img-fluid" />
            </div>
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Welcome Back To <strong>Damas</strong></h3>
                    <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
                  </div>
                  <form action="#" method="post">
                    <div className="form-group first">
                      <label for="username">Email</label>
                      <input className="form-control" id="username" type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div className="form-group first last mb-4">
                      <label for="password">Password</label>
                      <input className="form-control" id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <div className="d-flex mb-5 align-items-center">
                      <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                        {/* <input type="checkbox" checked="checked" /> */}
                        <div className="control__indicator"></div>
                      </label>
                      <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                    </div>

                    <button className="btn text-white btn-block btn-primary" onClick={handlelogin}>Log In</button>


                    <span className="d-block text-left my-4 text-muted"> or sign in with</span>

                    <div className="social-login">
                      <a href="#" className="facebook">
                        <span className="icon-facebook mr-3"></span>
                      </a>
                      <a href="#" className="twitter">
                        <span className="icon-twitter mr-3"></span>
                      </a>
                      <a href="#" className="google">
                        <span className="icon-google mr-3"></span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
