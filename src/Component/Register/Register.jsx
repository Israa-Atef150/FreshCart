import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const Register = () => {

  let navigate = useNavigate()

  let [errorMessage, setErrorMessage] = useState('')


  let [isLoading, setIsLoading] = useState(false)

  async function register(e) {
    // e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)


    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values).catch((err) => {
      setErrorMessage(err.response.data.message)
      console.log(err);
      setIsLoading(false)
      // console.log(err.response.data.message);
    })
    if (data.message === "success") {
      navigate('/login')
    }
    // console.log(data);
  }

  // function validation(values){
  //   let errors={}

  //   if(values.name == ''){
  //     errors.name='Name is required'
  //   }else if (values.name.length<3){
  //     errors.name='Min length 3 characters'
  //   }else if (values.name.length>20){
  //     errors.name= 'Max length 20 characters'
  //   }


  // if(values.email == ''){
  //   errors.email= 'Email is required'
  // }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email='enter valid email'
  // }

  //   if(values.password == ''){
  //     errors.password = 'password is required'
  //   }else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)){
  //     errors.password='Password must have letters, special character and numbers and must be greater than 8 characters'
  //   }

  //   if(values.rePassword == ''){
  //     errors.rePassword = 'Repassword is required'
  //   }else if (values.password != values.rePassword){
  //     errors.rePassword='Repassword and Password does not match'
  //   }

  // //   if(values.phone == ''){
  // //     errors.phone = 'Phone is required'
  //   }else if (!/^01[0125][0-9]{8}$/.test(values.phone)){
  //     errors.phone='Enter valid egyptian mobile number'
  //   }

  //   return errors
  // }

  let validationYup = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min length 3 characters').max(20, 'Max length 20 characters'),
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'enter valid email'),
    password: Yup.string().required('password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must have special character , number and greater than 8 characters '),
    rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref('password')], 'Repassword and Password does not match'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter valid egyption mobile number')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: register,
    // validate : validation
    validationSchema: validationYup
  })
  return (
    <>
      <div className="container justify-contant-center p-5 m-4">
        <h1>Register Now :</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="register-form">
                <label htmlFor="name" className='my-1'>name:</label>
                <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control' id='name' name='name' />
                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}
              </div>
            </div>
            <div className="col-md-6">
              <div className="register-form">
                <label htmlFor="email" className='my-1'>email:</label>
                <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control' id='email' name='email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
              </div>
            </div>
            <div className="col-md-6">
              <div className="register-form">
                <label htmlFor="password" className='my-1'>password:</label>
                <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' id='password' name='password' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
              </div>
            </div>
            <div className="col-md-6">
              <div className="register-form">
                <label htmlFor="rePassword" className='my-1'>repassword:</label>
                <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' id='rePassword' name='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}
              </div>
            </div>
            <div className="col-md-6">
              <div className="register-form">
                <label htmlFor="phone" className='my-1'>phone:</label>
                <input value={formik.values.phone} onChange={formik.handleChange} type="tel" className='form-control' id='phone' name='phone' />
                {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}
                {errorMessage ? <div className='alert alert-danger my-1'>{errorMessage}</div> : null}
              </div>
            </div>
          </div>
          {isLoading ?
            <button disabled type='button' className='btn bg-main d-block ms-auto my-2 text-white px-3'><i className='fas fa-spin fa-spinner'></i></button>
            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main d-block ms-auto my-2 text-white px-3'>Register</button>}
        </form>
      </div>
    </>
  )
}

export default Register


