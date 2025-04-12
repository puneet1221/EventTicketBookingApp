import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { FaSadTear } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

//responsible for displaying random events in a particular city
const Hero = ({ events }) => {
    const navigate = useNavigate('')
    const slider = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="max-w-screen-xl min-h-[50vh] bg-gray-200 rounded-xl relative top-20 mx-auto">
            {
                events&&
                events.length > 0 ? <Slider ref={slider} {...settings}>
                    {events.map((event, i) => {
                        return (
                            <div key={i} className="relative">
                                <div
                                    className="relative bg-black"
                                    onClick={() => {
                                        navigate('/event-page', {
                                            state: {
                                                "event":event
                                            }
                                        })
                                    }}
                                >
                                    <img
                                        className="mx-auto w-full h-[70vh] object-cover"
                                        src={event && event.bannerUrl}
                                        alt={'an error occurred loading the images'}
                                    />
                                    {/* <div className="absolute bottom-8 text-white p-4">
                                        <h1 className="text-5xl">{event && event.name || "name of the event"}</h1>
                                        <h2 className="text-lg">
                                            {event && event.about || "lorem kdgjdskg dsgsdsd dgklsdg"}
                                        </h2>
                                    </div> */}

                                    <span className="bg-red-500 text-lg font-semibold text-white absolute top-8 right-10 rounded-md px-2">
                                        {event?.genre}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
                    : <h1 className='flex gap-x-5 items-center p-4 h-auto absolute top-[35%]  left-[30%] text-4xl text-gray-400 text-center font-bold align-center'>Something went wrong !<FaSadTear className='text-yellow-400  outline-red-400 bg-black rounded-full' /></h1>
            }

        </div>
    );
};

export default Hero;
