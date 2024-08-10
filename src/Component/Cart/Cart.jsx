import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
const Cart = () => {
  const [,setErrorMessage] = useState('');
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const[requestTime , SetRequestTime]= useState();
  const[productId,setProductId]=useState()
  const[totalPrice,setTotalPrice]=useState(0)
  const{setCartNumber}=useContext(AuthContext)
  
  useEffect(()=>{
    getProduct()
  },[])
  

    async function getProduct(){
      setIsLoading(true)
      try{
        let response=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        if(response?.data){
          setCartProducts(response?.data?.data?.products)
           setProductId(response?.data?._id);
           setTotalPrice(response?.data?.data?.totalCartPrice);
           setCartNumber(response?.data?.numOfCartItems)
           localStorage.setItem("cartNumber",response?.data?.numOfCartItems)
        }
      }catch(error){
        setErrorMessage(error.response.data.message)
      }finally{
        setIsLoading(false)
      }
    }

    async function removeProduct(id){
      setIsLoading(true)
      try{
        setCartProducts((prev)=>{
          return(
            prev.filter((product)=>{
              return(
                product.product._id!==id
              )
            })
          )
        })
        let response=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        if(response?.data){
          setCartProducts(response?.data?.data?.products)
          setTotalPrice(response?.data?.data?.totalCartPrice);
          setCartNumber(response?.data?.numOfCartItems);
          localStorage.setItem("cartNumber",response?.data?.numOfCartItems)
        }
      }catch(error){
        setErrorMessage(error.response.data.message)
      }finally{
        setIsLoading(false)
      }
    }

    async function clearProducts(){
      setIsLoading(true)
      try{
        setCartProducts([])
        let response=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        if(response?.data){
          setCartProducts([])
          setTotalPrice(0);
          setCartNumber(0)
          localStorage.setItem("cartNumber",0)
        }
      }catch(error){
        setErrorMessage(error.response.data.message)
      }finally{
        setIsLoading(false)
      }
    }

    function updateProduct(id,count,index){
      let newProduct=[...cartProducts]
      let response;
      newProduct[index].count=count

      setCartProducts(newProduct)
      if(newProduct[index].count<0){
        newProduct[index].count=0
      }
      clearTimeout(requestTime)
      SetRequestTime(setTimeout(async()=>{
        
        try{
           response=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},
          {headers:{
            token:localStorage.getItem("token")
          }})
          
        
          if(response.data){
            setCartProducts(response.data.data.products)
            setTotalPrice(response?.data?.data?.totalCartPrice);
          }
          if(response.data.data.products[index].count<0){
            response.data.data.products[index].count=0
          }
        }catch(error){
          
        }
      },1000))
    }
   
  return (
    isLoading? <div className='d-flex justify-content-center align-items-center py-5 my-5'>
    <i className='fas fa-spin fa-spinner fa-2x'></i>
  </div>:
    cartProducts.length===0?<div className='alert alert-danger text-center'>No Cart Exists for the user</div>:
            <>
              <button className='btn btn-success d-block ms-auto'
              onClick={clearProducts}>Clear Cart</button>
              {cartProducts.map((product , index )=> (
                <div key={product._id} className='cart-product shadow overflow-hidden rounded-5 my-2'>
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img className='w-100' src={product.product.imageCover} alt="" />
                    </div>
                    <div className="col-md-8">
                      <h2>{product.product.title}</h2>
                      <h5>{product.product.category.name}</h5>
                      <p className='d-flex justify-content-between'>
                        <span>{product.price} EGP</span>
                        <span>
                          <i className='fas fa-star rating-color me-1'></i>{product.product.ratingsAverage}
                        </span>
                      </p>
                      <p>
                        <span className='fw-bolder'>Total Price:</span> {Math.max(product.count * product.price,0)} EGP
                      </p>
                    </div>
                    <div className="col-md-2">
                      <button className='btn btn-danger d-block' onClick={()=>{
                        removeProduct(product.product._id,index)
                      }}>Remove</button>
                      <div className="d-flex align-items-center">
                        <button  className='btn bg-main text-white mx-2' onClick={()=>{
                          updateProduct(product.product._id,product.count+1,index)
                        }}>+</button>
                        <span>{Math.max(0, product.count)}</span>
                        <button  className='btn bg-main text-white mx-2' onClick={()=>{
                          updateProduct(product.product._id,product.count-1,index)}}>-</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='d-flex justify-content-between'>
                <Link to={`/payment/${productId}`}>
                          <button className='btn btn-success text-white py-1'>
                            check
                          </button>
                </Link>
                <p>
                  TotalPrice:{totalPrice}
                </p>
              </div>
            </>
          )}
export default Cart;

