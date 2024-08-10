import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className='bg-main-light p-5'>
        <div className="container1">
          <h4>Get the FreshCart App</h4>
          <p>We will send you a link ,open it on your phone tp download the app.</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <input type="email" className='form-control py-2'placeholder='Email...' />
            </div>
            <div className="col-lg-2">
              <button className='btn bg-main w-100 text-white'>Share App Link</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer