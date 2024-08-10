import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


const NewPassword = () => {
    let[errorMessage,setErrorMessage]=useState('')
    let navigate=useNavigate()
   async function renew(values){
        try{
            let response=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
            if(response?.data?.token){
                navigate("/login")
            }
        }catch(error){
            setErrorMessage(error.response.data.message)
        }
    }
    let validation=Yup.object({
        email:Yup.string().required('email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i ,'enter valid email'),
        newPassword:Yup.string().required('new password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ , 'Password must have special character , number and greater than 8 characters ')
    })
    let formik=useFormik({
        initialValues:{
            email:"",
            newPassword: ""
        },
        validationSchema:validation,
        onSubmit:renew
    })
  return (
    <div className="container">
        <h1>New Password :</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <div className="form">
                        <label htmlFor="email" className='my-1'>email:</label>
                        <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control' id='email' name='email' />
                        {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>: null}
                        {errorMessage?<div className='alert alert-danger'>{errorMessage}</div>:''}
                    </div>
                </div>
            <div className="col-md-12">
                <div className="form">
                <label htmlFor="newPassword" className='my-1'>new Password:</label>
                <input value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' id='newPassword' name='newPassword' />
                {formik.errors.newPassword  && formik.touched.newPassword?<div className='alert alert-danger'>{formik.errors.newPassword}</div>: null}
                </div>
            </div>
            </div>
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main d-block ms-auto my-2 text-white px-3'>Submit</button>
        </form>
    </div>
  )
}

export default NewPassword