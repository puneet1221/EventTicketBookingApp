import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaSadTear } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import EventCard from '../EventCard/EventCard';
import './main.css';

export const CategoryEvents = ({ eventsList,title }) => {
    const slider = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <div className="relative w-auto mx-auto p-10">
            <div className="text-3xl px-10 font-bold text-gray-600 text-left mb-6">{title} </div>

            {/* Slider Wrapper */}
            <div className="w-full px-10">
                {
                    eventsList.length > 0 ? <Slider className="slider p-0" ref={slider} {...settings}>
                        {eventsList.map((event, i) => (<EventCard event={event} key={i} />))}
                    </Slider> : <h1 className='flex gap-x-5 items-center p-4 h-auto absolute top-[35%]  left-[30%] text-4xl text-gray-400 text-center font-bold align-center'>Failed to Load!<FaSadTear className='text-yellow-400  outline-red-400 bg-black rounded-full' /></h1>
                }
            </div>

            {/* Navigation Arrows */}
            {eventsList.length > 0 && <>  <FaArrowRight
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-500 rounded-full bg-red-100 p-2 box-content cursor-pointer"
                onClick={() => {
                    slider.current.slickNext();
                }}
            />
                <FaArrowLeft
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-red-500 rounded-full bg-red-100 p-2 box-content cursor-pointer"
                    onClick={() => {
                        slider.current.slickPrev();
                    }}
                /></>}

        </div>
    );
};
