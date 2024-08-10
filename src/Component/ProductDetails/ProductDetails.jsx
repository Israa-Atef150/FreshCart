import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

const ProductDetails = () => {

    let { id } = useParams()

    let [productDetails, setProductDetails] = useState({})
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getProductDetails(id)
    }, [id])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    async function getProductDetails(productId) {
        setIsLoading(true)
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + productId)
        setProductDetails(data.data)
        setIsLoading(false)
    }


    return (
        isLoading ?
            <div className='d-flex justify-content-center align-items-center py-5 my-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div> :
            <div className="row align-items-center">
                <div className="col-md-3">
                    <div className="imageProduct">

                        <Slider {...settings}>
                            {productDetails?.images?.map((img, index) => {
                                return <img key={index} className='w-100' src={img} alt="" />
                            })}
                        </Slider>
                    </div>
                </div>
                <div className="col-md-9">
                    <h2 className='mt-2'>{productDetails?.title}</h2>
                    <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
                    <p>{productDetails?.description}</p>
                    <p className='d-flex justify-content-between mt-2'>
                        <span>
                            {productDetails?.price} EGP
                        </span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            <span>{productDetails?.ratingsAverage}</span>
                        </span>
                    </p>
                    <button className='btn bg-main text-white w-100 mt-2'>Add To Cart</button>
                </div>
            </div>
    )
}

export default ProductDetails