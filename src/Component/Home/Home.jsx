import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import MainSlider from '../MainSlider/MainSlider'
import CategorieSlider from '../CategorieSlider/CategorieSlider'
import LiveChat from '../LiveChat/LiveCaht'

const Home = () => {

  let [products, setProducts] = useState([])

  let [page, setPage] = useState(1) // State to manage the current page
  let [loading, setLoading] = useState(false) // State to manage loading state
  let [hasMore, setHasMore] = useState(true) // State to check if there are more products

  useEffect(() => {
    getAllProducts(page)
  }, [page])

  async function getAllProducts(page) {
    setLoading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
    if (data.data.length > 0) {
      setProducts(prevProducts => [...prevProducts, ...data.data])
    } else {
      setHasMore(false) // No more products to load
    }
    setLoading(false)
  }
  


  return (
    <>
      <MainSlider />
      <CategorieSlider />
      <div className="row">
        {products?.map((product) => {
          return <Product key={product._id} product={product} />
        })}
      </div>
      <div className="text-center my-3">
        {hasMore && (
          <button 
            className="btn btn-success" // Use Bootstrap's btn-success class
            onClick={() => setPage(prevPage => prevPage + 1)}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show more'}
          </button>
        )}
        {!hasMore && <p>You Saw All Our Products : </p>}
      </div>
      <LiveChat />
    </>
  )
}

export default Home