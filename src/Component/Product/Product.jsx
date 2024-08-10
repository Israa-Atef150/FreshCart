import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Product.module.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../../Contexts/AuthContext'

const Product = ({product}) => {



  let{setUserLoggedIn,setCartNumber} = useContext(AuthContext)
  
  let navigate = useNavigate()


  async function addProductToCart(id){
    toast.success('Adding product to cart...');
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
      productId:id
    },{
      headers:{
        token:localStorage.getItem('token')
      }
    }).catch((err)=>{
      toast.error(err.response.data.message)
      setUserLoggedIn(false)
      localStorage.removeItem('token')
      navigate('/login')
    })

    if(response){
      toast.success(response.data.message)
      setCartNumber(response?.data?.numOfCartItems);
      localStorage.setItem("cartNumber",response?.data?.numOfCartItems)
    }
  }

  return <div className="col-md-3 col-sm-12">
      <div  className="product px-2 py-3 overflow-hidden">
        <Link className={styles.a} to={'/productDetails/' + product._id}>
        <img className='w-100' src={product.imageCover} alt="product" />
        <h5 className='font-sm text-main'>{product.category.name}</h5>
        <h4>{product.title.split(' ').slice(0 , 2).join(' ')}</h4>
        <p className='d-flex justify-content-between me-1'>
          <span>
            {product.price} EGP
          </span>
          <span>
            <i className='fas fa-star rating-color'></i>
            {product.ratingsAverage}
          </span>
        </p>
        </Link>
        <button onClick={()=>{
          addProductToCart(product._id)
        }} className='btn bg-main w-100 text-white'>Add To Cart</button>
      </div>
      
    </div>
  
}

export default Product