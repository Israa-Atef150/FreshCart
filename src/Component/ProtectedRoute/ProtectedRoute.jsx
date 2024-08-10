// import React, { useContext } from 'react'
// import { AuthContext } from '../../Contexts/AuthContext'
// import { Navigate } from 'react-router-dom'

// const ProtectedRoute = ({children}) => {
    
//     let {userLoggedIn}=useContext(AuthContext)

//     console.log(userLoggedIn);
//     if(userLoggedIn){
//         return children
//     }else{
//         return <Navigate to={'/login'}/>
//     }
// }

// export default ProtectedRoute