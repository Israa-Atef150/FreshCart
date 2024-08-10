import React, { useContext } from 'react'
import img1 from '../../Assets/Images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './Navbar.module.css'
import { AuthContext } from '../../Contexts/AuthContext'

// import { useTotalPrice } from '../../TotalPrice'
const Navbar = () => {

  // const { totalPrice, setTotalPrice } = useTotalPrice();
  let navigate = useNavigate()

  let { userLoggedIn, setUserLoggedIn, cartNumber } = useContext(AuthContext)
  function logOut() {
    setUserLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container" >
        <Link className="navbar-brand" to={'/home'}>
          <img src={img1} alt="logo-cart" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {userLoggedIn ?
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/home'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/cart'}>Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/about-us'}>About Us</Link>
              </li>
              
         <li className="nav-item">
           <Link className="nav-link" to={'/meet-our'}>Meet Our</Link>
         </li>
     
            </ul>
            : null}

          <ul className={`navbar-nav d-flex align-items-center ${Styles.list} ms-auto`} id="navbarNav">

            <li>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
            {!userLoggedIn ? <>
              <li className='nav-item'>
                <Link className='nav-link' to={'login'}>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'register'}>
                  Register
                </Link>
              </li>
            </> : <>
              <Link to={'/cart'}>
                <i className="fa-solid fa-cart-shopping position-relative mx-3 text-success">
                  <span class="position-absolute top-0 start-100 translate-middle-y badge rounded-pill bg-success">
                    {cartNumber}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </i>
              </Link>
              <li className='nav-item'>
                <span onClick={logOut} className='nav-link cursor-pointer'>
                  Logout
                </span>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar