import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const CategorieSlider = () => {

    let [categories, setCategories] = useState([])

    useEffect(() => {
        getCategorieSlider()
    }, [])

    async function getCategorieSlider() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(data.data)
    }

    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props
        return (
            <FaArrowLeft
                className={className}
                style={{ ...style, display: 'block', color: 'black' }}
                onClick={onClick}
            />
        )
    }

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props
        return (
            <FaArrowRight
                className={className}
                style={{ ...style, display: 'block', color: 'black' }}
                onClick={onClick}
            />
        )
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1, // Adjust this value to control the scroll speed
        arrows: true,
        draggable: false, // Disable dragging
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1, // Adjust this value to control the scroll speed
                    arrows: true,
                    draggable: false, // Disable dragging
                    prevArrow: <CustomPrevArrow />,
                    nextArrow: <CustomNextArrow />,
                }
            }
        ]
    };

    return (
        <>
            <Slider {...settings} className='mb-2'>
                {categories.map((img, index) => {
                    return <div key={index}>
                        <img height={200} className='w-100' src={img.image} alt="" />
                        <h5 className='text-center font-sm'>{img.name}</h5>
                    </div>
                })}
            </Slider>
        </>
    )
}

export default CategorieSlider
