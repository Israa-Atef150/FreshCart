import './App.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Cart from './Component/Cart/Cart';
import NotFound from './Component/NotFound/NotFound';
import AuthContextProvider from './Contexts/AuthContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import ProtectedLogIn from './Component/ProtectedLogIn/ProtectedLogIn';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Payment from './Component/Payment/Payment';
import Orders from './Component/Orders/Orders';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import NewPassword from './Component/NewPassword/NewPassword';
import AboutUs from './Component/AboutUs/AboutUs';
import MeetOur from './Component/MeetOur/MeetOur';

function App() {


  let routers = createBrowserRouter([
    {path:'', element:<Layout/>,children:[
      {path:'/FreshCart', element:<Navigate to={'home'}/>},
      {path:'/home',element:<Home/>},
      {path:'/login',element:<ProtectedLogIn><Login/></ProtectedLogIn>},
      {path:'/register',element:<ProtectedLogIn><Register/></ProtectedLogIn>},
      {path:'/forgotpassword',element:<ProtectedLogIn><ForgotPassword/></ProtectedLogIn>},
      {path:'/newpassword',element:<ProtectedLogIn><NewPassword/></ProtectedLogIn>},
      {path:'/cart',element:<Cart/>},
      {path:'/productDetails/:id',element:<ProductDetails/>},
      {path:'/cart',element:<Cart/>},
      {path:'/payment/:id',element:<Payment/>},
      {path:'/allorders',element:<Orders/>},
      {path:'/meet-our',element:<MeetOur/>},
      {path:'/about-us',element:<AboutUs/>},
      {path:'*',element:<NotFound/>},
    ]}
  ])

  return (
    <AuthContextProvider>

      <RouterProvider router={routers}>

      </RouterProvider>
    </AuthContextProvider>
  );
}

export default App;

