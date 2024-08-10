import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedLogIn = ({children}) => {
  let{userLoggedIn}=useContext(AuthContext)
 console.log(userLoggedIn);
  if(userLoggedIn){
    return<Navigate to={'/home'}/>
  }else{
    return children
  }

}

export default ProtectedLogIn