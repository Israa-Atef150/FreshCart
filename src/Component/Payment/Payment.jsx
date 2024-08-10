import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Payment = () => {
  let [errorMessage] = useState('')
  let [isLoading] = useState(false)

  let { id } = useParams()
  async function checkPayment(values) {
    try {
      let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, { shippingAddress: values }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      if (response?.data) {
        window.location.href = response.data.session.url
      }
    } catch {

    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: checkPayment,
    validate: validation
  })
  function validation(values) {
    let errors = {}

    if (values.details == '') {
      errors.details = 'Details are required'
    } else if (values.details.length < 5) {
      errors.details = 'Min length 5 characters'
    } else if (values.details.length > 20) {
      errors.details = 'Max length 20 characters'
    }

    if (values.phone == '') {
      errors.phone = 'Phone is required'
    } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
      errors.phone = 'Enter valid egyptian mobile number'
    }

    return errors
  }







  return (<>
    <div className="container">
      <h1>Check :</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="register-form">
              <label htmlFor="details" className='my-1'>Details:</label>
              <input value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control' id='details' name='details' />
              {formik.errors.details && formik.touched.details ? <div className='alert alert-danger'>{formik.errors.details}</div> : null}
            </div>
          </div>
          <div className="col-md-12">
            <div className="register-form">
              <label htmlFor="phone" className='my-1'>phone:</label>
              <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className='form-control' id='phone' name='phone' />
              {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}
              {errorMessage ? <div className='alert alert-danger my-1'>{errorMessage}</div> : null}
            </div>
          </div>
          <div className="col-md-12">
            <div className="register-form">
              <label htmlFor="city" className='my-1'>city:</label>
              <input value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control' id='city' name='city' />
              {formik.errors.city && formik.touched.city ? <div className='alert alert-danger'>{formik.errors.city}</div> : null}
              {errorMessage ? <div className='alert alert-danger my-1'>{errorMessage}</div> : null}
            </div>
          </div>
        </div>
        {isLoading ?
          <button disabled type='button' className='btn bg-main d-block ms-auto my-2 text-white px-3'><i className='fas fa-spin fa-spinner'></i></button>
          : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main d-block ms-auto my-2 text-white px-3'
          >Pay</button>}
      </form>
    </div>
  </>
  )
}

export default Payment