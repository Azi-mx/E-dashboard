import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user')

  // We are removing the data from local storage by using logout function onClick
  const logout = () => {
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>

      {auth ?
        <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand text-light" href="#">Damas</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <li><Link to="/" class="nav-link text-light">Products</Link></li>
              <li><Link to="/add" class="nav-link text-light">Add Products</Link></li>
              <li><Link to="/profile" class="nav-link text-light">Profile</Link></li>
              <li><Link onClick={logout} to="/signup" class="nav-link text-light">Logout ({JSON.parse(auth).name})</Link></li>
            </div>
          </div>
        </div>
      </nav>
        :
        <ul className='nav-ul nav-right'>
          <>
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        </ul>
      }
    </div>
  )
}

