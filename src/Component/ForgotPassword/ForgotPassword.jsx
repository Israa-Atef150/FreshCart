import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const[errorMessage,setErrorMessage]=useState('')
  let navigate=useNavigate()


    async function forgot(){
        let response=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',forgotPassword.values)
        console.log(response);
        if(response.data.statusMsg==='success'){
            document.getElementById('formOne').classList.add('d-none');
            document.getElementById('formTwo').classList.replace("d-none",'d-block')
        }
    }


    function validation(values){
        let errors={}
        if(values.email===''){
            errors.email='email is required'
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email='enter valid email'
        }


        return errors
    }

    let forgotPassword=useFormik({
        initialValues:{
            email:''
        },
        validate:validation,
        onSubmit:forgot
    })


    // now formik for reset code

    async function reset(values){
        try{
          let response=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
          if(response.data.status==='Success'){
              setErrorMessage('')
              navigate('/newpassword')
          }
        }catch(error){
          setErrorMessage(error.response.data.message);
        }
    }

    function validation2(values){
        let errors={}
        if(values.resetCode===''){
            errors.resetCode='Code is required'
        }else if(!/^[0-9]+$/.test(values.resetCode)){
            errors.resetCode='enter the numbers sent to your e-mail'
        }
      return errors
      }


    let verify=useFormik({
        initialValues:{
            resetCode:''
        },
        validate:validation2,
        onSubmit:reset
    })



  return (
    <div className="container">
    <form onSubmit={forgotPassword.handleSubmit} id='formOne'>
    <div className="row">
      <div className="col-md-12">
        <div className="register-form">
          <label htmlFor="email" className='my-1'>Email:</label>
          <input value={forgotPassword.values.email} onBlur={forgotPassword.handleBlur} onChange={forgotPassword.handleChange} type="email" className='form-control' id='email' name='email' />
          {forgotPassword.errors.email && forgotPassword.touched.email?<div className='text-danger'>{forgotPassword.errors.email}</div>: null}
        </div>
      </div>
    </div>
    <button className='btn btn-success my-2 text-white' type='submit'>
        Reset Password
    </button>
    </form>
    <form onSubmit={verify.handleSubmit} id='formTwo' className='d-none'>
    <div className="row">
      <div className="col-md-12">
        <div className="register-form">
          <label htmlFor="resetCode" className='my-1'>Code:</label>
          <input value={verify.values.resetCode} onBlur={verify.handleBlur} onChange={verify.handleChange} type="text" className='form-control' id='resetCode' name='resetCode' />
          {verify.touched.resetCode?<div className='text-danger'>{verify.errors.resetCode}</div>: null}
          {errorMessage?<div className='alert alert-danger'>{errorMessage}</div>:''}
        </div>
      </div>
    </div>
    <button className='btn btn-success my-2 text-white' type='submit'>
        Reset Code
    </button>
    </form>
  </div>
)
}

export default ForgotPassword