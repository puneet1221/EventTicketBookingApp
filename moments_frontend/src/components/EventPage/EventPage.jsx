import React, { useContext, useEffect, useState } from 'react';
import { FaCalendar, FaMapPin, FaStar, FaUserFriends } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"; // Import the gallery CSS
import { useLocation, useNavigate } from 'react-router';
import { AppContext } from '../AppContext';
import './gallery.css';





const EventPage = () => {
    const location = useLocation();
    const { event } = location.state || {}
    console.log(location);
    const navigate = useNavigate()
    const { login, formatDateTime } = useContext(AppContext)
    const handleBook = (e) => {
        if (login) {
            navigate('/event/book-event', {
                state: {
                    "event": event
                }
            })
        }
        else {
            navigate('/login',{state:{from:'/event-page',
                event:event}})
        }
    }

    const [images, setImages] = useState([{

    }]);

    useEffect(() => {
        const mappedImages = event.gallery.map(imageUrl => ({
            original: imageUrl,
            thumbnail: imageUrl,
        }));
        console.log(event);
        setImages(mappedImages);
    }, [event]);

    return (

        <div className='p-[8%] flex-col gap-y-10 '>
            <section className=" flex flex-col lg:flex-row gap-8 mb-10">
                {/* Image Section */}
                <div className="w-full lg:w-2/3 h-96 lg:h-[75vh]">
                    <img
                        src={event && event.bannerUrl || "https://www.w3schools.com/w3images/lights.jpg"}
                        alt="Event"
                        className="h-full w-full object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* Event Details Section */}
                <div className="flex border flex-col justify-around lg:w-[30%] px-8 py-8   rounded-lg ">
                    {/* Event Title */}
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            {event && event.name || "Spoken Fest | Mumbai 2025"}
                        </h1>

                    </div>

                    {/* Event Details */}
                    <div className="flex items-center gap-4 text-md text-gray-600">
                        <FaStar className="text-gray-800" />
                        <span>{event && event.genre || "Festival"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-md text-gray-600">
                        <FaCalendar className="text-gray-800" />
                        <span>
                            {event && event.dateTime ? formatDateTime(event.dateTime) : "12th Jan 2025, 5:00 PM"}
                        </span>                    </div>

                    <div className="flex items-center gap-3 text-md text-gray-600">
                        <FaMapPin className="text-gray-800" />
                        <span>{event && (event.address.venue + " ," + event.address.city) || "Jio Gardens, Mumbai"}</span>
                    </div>

                    <hr className='h-[2px] bg-gray-400'></hr>


                    {/* Pricing and Booking */}
                    <div className="flex items-center justify-between text-gray-800 border-top-">
                        <p className="text-md font-semibold">
                            <span className="font-bold text-xl">
                                {event && event.ticketCost > 0
                                    ? `₹${event.ticketCost} onwards`
                                    : "Free"}
                            </span>
                        </p>
                        <button
                            to="/event/book-event"
                            className="inline-block hover:bg-sky-500 px-2 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
                            onClick={handleBook}
                        >
                            BUY NOW
                        </button>
                    </div>

                    {/* Invite Friends Section */}
                    <div className=" p-3 rounded-md flex items-center gap-4 bg-gray-200 ">
                        <FaUserFriends className="text-3xl text-gray-600 " />
                        <div>
                            <p className="text-lg font-medium text-gray-800">
                                Invite your friends
                            </p>
                            <p className="text-sm text-gray-600 flex">
                                And enjoy a shared experience
                                <a
                                    href="https://x.com/"
                                    className="ml-2 text-blue-500 hover:underline flex items-center gap-1"
                                >
                                    <FaTwitter className="text-blue-500" />

                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            <div className=" bg-gray-50 p-5 rounded-xl shadow-lg w-full mx-auto">
                {/* <!-- About The Event Title --> */}
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">About The Event</h1>
                </div>

                {/* <!-- Event Description --> */}
                <div className="mb-6 text-lg text-gray-600 leading-relaxed space-y-4 p-5">
                    {
                        event && <>
                            {<p>{event.about}</p>}
                        </>
                    }
                </div>

                {/* gallery */}
                <> <div className="w-2/3 m-auto">
                    <h2 className='text-center text-2xl font-bold p-2 text-red-600'> Gallery</h2>
                    <ImageGallery additionalClass='rounded-3xl' showPlayButton={false} infinite={false} items={images} />
                </div></>


                {/* <!-- What to Expect Section --> */}
                <div className="mb-6   text-lg text-gray-600 leading-relaxed">
                    <h2 className="font-semibold text-xl text-gray-800">🔥 What to expect?</h2>
                    <ul className="list-disc list-inside space-y-1 p-5">
                        {
                            event && <>
                                {event.whatToExpect.map((item, key) => {
                                    return <li>{item}</li>
                                })
                                }
                            </>
                        }
                    </ul>
                </div>


            </div>

            {/* <!-- Event Info Section --> */}
            <div className="bg-gray-100 p-5 rounded-xl shadow-lg w-full mx-auto mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Guide</h2>

                {/* <!-- Event Details --> */}
                <div className="space-y-4 px-5 text-gray-600">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">Language:</span>
                        <span>
                            {
                                event && <>
                                    {
                                        event.languages?.map((item) => (
                                            <span>{item} , </span>
                                        ))
                                    }
                                </>
                            }
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">Duration:</span>
                        <span>{event && event.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">Best Suited For Ages:</span>
                        <span>{event && event.suitableFor}</span>
                    </div>
                </div>
            </div>

            {/* <!-- Venue Information --> */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg w-full mx-auto mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Venue</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {event && event.address ? `${event.address.venue}, ${event.address.landMark}, ${event.address.city}, ${event.address.pincode}` : ""}
                </p>
                <a href="#" className="text-blue-500 hover:underline">Get Directions</a>
            </div>
            {/* <!-- Terms & Conditions Section --> */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-lg w-full mx-auto mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms & Conditions</h2>
                <ul className="list-decimal pl-5 text-gray-600">
                    {
                        event.termsAndConditions && event.termsAndConditions.map(item => {
                            return <p className='text-sm text-gray-400'>{item}</p>
                        })
                    }
                </ul>
            </div>

        </div>

    );
};

export default EventPage;
