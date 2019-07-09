import React from 'react'
import Slider from "react-slick"

import slide_one from '../../resources/images/slide_one.jpg';
import slide_two from '../../resources/images/slide_two.jpg';
import slide_three from '../../resources/images/slide_three.jpg';

const Carousel = () => { // Scrolls through pictures. Documentation can be found at react-slick
    
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500
    }

    return (
        <div
            className='carousel_wrapper' 
            style={{
                height: `${window.innerHeight}px`, //provides the correct height based on the window size
                overflow: 'hidden' //any overflow is clipped, and the rest of the content is hidden
            }}
        >

        <Slider {...settings}> {/** Puts in all the props (i.e. settings)*/}
            <div>
                <div 
                    className='carousel_image'
                    style={{
                        background:`url(${slide_one})`,
                        height: `${window.innerHeight}px`
                    }}
                ></div>
            </div>
            <div>
                <div 
                    className='carousel_image'
                    style={{
                        background:`url(${slide_two})`,
                        height: `${window.innerHeight}px`
                    }}
                ></div>
            </div>
            <div>
                <div 
                    className='carousel_image'
                    style={{
                        background:`url(${slide_three})`,
                        height: `${window.innerHeight}px`
                    }}
                ></div>
            </div>
        </Slider>
        </div>
    )
}

export default Carousel