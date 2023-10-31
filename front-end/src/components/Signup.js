import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
  //By using use state every detail is got in variables
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let flag;
  const navigate = useNavigate()


  //To check if the user have already signed up, the data from localstorage is got and checked so it will
  // navigate user to the '/' page
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  }, [navigate])
// Validations




  // 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }

  
    // Add class based on the content of the input
    const field = e.target.closest('.form-group');
    if (field) {
      if (value.trim() !== '') {
        field.classList.add('field--not-empty');
      } else {
        field.classList.remove('field--not-empty');
      }
    }
  };

  
  const collectData = async () => {
    console.warn(name, email, password)
    if (name, email, password) {
      const res = {
        name: name,
        email: email,
        password: password
      }
      console.log(res);

      //Here api is integrated using fetch method and the data will only fetch when localhost is running on local
      let result = await fetch('https://e-dashboard-x01t.onrender.com/register',
        {
          method: 'post',
          //We are using json.stringify just because we are send data so data should be in Json format
          //The data we got by using use state will be now sent to database for registration
          body: JSON.stringify(res),
          headers: {
            'Content-type': 'application/json'
          }
        })
      ///  .json() method is used to get data in proper format
      result = await result.json()
      console.log(result)
      // Here we are saving the users's data in localstorage  
      localStorage.setItem("user", JSON.stringify(result.Createuser))

      // Here we are saving that token in localstorage
      localStorage.setItem("token", JSON.stringify(result.auth))

      if (result) {
        navigate('/')
      }



      flag = 0
    } else {
      flag = 1;
    }

  }
  return (
    <>

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
                    <h3>Sign Up <strong>Damas</strong></h3>
                    <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
                  </div>

                  <div class="form-group first">
                    <label for="username">Username</label>
                    <input
                      className={`form-control ${name ? 'field--not-empty' : ''}`}
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div class="form-group first">
                    <label for="username">Email</label>
                    <input
                      className={`form-control ${email ? 'field--not-empty' : ''}`}
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div class="form-group first last mb-4">
                    <label for="password">Password</label>
                    <input
                      className={`form-control ${password ? 'field--not-empty' : ''}`}
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />

                  </div>

                  <div className="d-flex mb-5 align-items-center">
                    <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                      <input type="checkbox" />
                      <div className="control__indicator"></div>
                    </label>
                  </div>

                  <div>
                    <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                  </div>

                  <button className="btn text-white btn-block btn-primary" onClick={collectData}>Sign Up</button>

                  <span className="d-block text-left my-4 text-muted"> or sign in with</span>

                  <div className="social-login">
                    <a href="#" className="facebook">
                      <span className="icon-facebook mr-3"></span>
                    </a>
                    <a href="#" className="twitter">
                      <span className="icon-twitter mr-3"></span>
                    </a>
                    <a href="" className="google">
                      {/* <span className="icon-google mr-3" onClick ={googleauth()}></span> */}
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}
