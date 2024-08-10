import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext'

const Login = () => {


  let [errorMessage, setErrorMessage] = useState('')


  let [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate()


  let { setUserLoggedIn } = useContext(AuthContext)

  // console.log(userLoggedIn);


  // useEffect(()=>{
  //   if(userLoggedIn === true){
  //     navigate('/home')
  //   }
  // })

  async function login(e) {
    // e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)


    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formik.values).catch((err) => {
      setErrorMessage(err.response.data.message)
      // setErrorMessage('')  
      setIsLoading(false)
    })
    if (data.message === "success") {
      setUserLoggedIn(true)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
  }


  let validationYup = Yup.object({
    email: Yup.string().required('password is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'enter valid email'),
    password: Yup.string().required('password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must have special character , number and greater than 8 characters '),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: login,
    // validate : validation
    validationSchema: validationYup
  })
  return (
    <>
      <div className="container">
        <h1>Log in :</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="register-form">
                <label htmlFor="email" className='my-1'>email:</label>
                <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control' id='email' name='email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
              </div>
            </div>
            <div className="col-md-12">
              <div className="register-form">
                <label htmlFor="password" className='my-1'>password:</label>
                <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' id='password' name='password' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
                {errorMessage ? <div className='alert alert-danger my-1'>{errorMessage}</div> : null}
              </div>
            </div>
          </div>
          <div className="buttons d-flex justify-content-between">
            <Link to={'/forgotpassword'}>
              <button className='btn bg-main my-2 text-white px-3'>
                Forgot Password
              </button>
            </Link>
            <div>
              {isLoading ?
                <button disabled type='button' className='btn bg-main my-2 text-white px-3'><i className='fas fa-spin fa-spinner'></i></button>
                : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main d-block ms-auto my-2 text-white px-3'>login</button>}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login