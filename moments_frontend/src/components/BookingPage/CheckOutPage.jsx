// Enhanced React component for the Moments App checkout page with improved design and dynamic data handling

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import Spinner from '../LoadingSpinner/Spinner';

const CheckoutPage = () => {
    const location = useLocation();
    const { bookingDetails } = location.state || {};
    const { userDetails } = useContext(AppContext);
    const [loading, setLoading] = useState(false)

    if (!bookingDetails) {
        return (
            <div className="checkout-page container mx-auto p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-red-500">No booking details available. Please go back and try again.</h1>
            </div>
        );
    }

    const handlePayment = () => {
        setLoading(true)
        axios.post('http://localhost:8080/user/create-payment', {
            method: "paypal",
            amount: bookingDetails.event.ticketCost * bookingDetails.quantity,
            currency: "USD",
            description: `for booking tickets of ${bookingDetails.event.name} held at MUMBAI`,
            bookingDetails: bookingDetails,
            username: userDetails.username
        }, {
            headers: {
                Authorization: `Basic ${userDetails.encodedCredentials}`
            }
        }).then((response) => {
            if (response.data) {
                setLoading(false)
                window.location.replace(response.data);
            }
        })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
        console.log('Redirecting to payment gateway...');
    };
    return (
        <div className="checkout-page container mx-auto px-[20%] py-[10%] bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center text-red-500 mb-10">Confirm Your Booking</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Event Details */}
                <div className="event-details bg-white shadow-lg rounded-lg p-5">
                    <h2 className="text-md font-semibold border-b-2 text-red-500 mb-3">Event Details</h2>
                    <p className="text-gray-700 mb-3"><strong>Event Name:</strong> {bookingDetails.event.name}</p>
                    <p className="text-gray-700 mb-3"><strong>Venue:</strong> {bookingDetails.event.address.venue}, {bookingDetails.event.address.city}</p>
                    <p className="text-gray-700 mb-3"><strong>Date & Time:</strong> {new Date(bookingDetails.event.dateTime).toLocaleString()}</p>
                    <p className="text-gray-700 mb-3"><strong>Duration:</strong> {bookingDetails.event.duration}</p>

                </div>

                {/* Guest Details */}
                <div className="guest-details bg-white shadow-lg rounded-lg p-5">
                    <h2 className="text-md font-semibold  border-b-2 text-red-500 mb-2">Guest Details</h2>
                    <ul className="list-disc pl-5">
                        {bookingDetails.guestList.map((guest, index) => (
                            <li key={index} className="text-gray-700 mb-2">
                                {guest.fname} {guest.lname}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Total Amount */}

            <h2 className="text-md font-semibold text-gray-500 mb-6 p-2">Total Amount :  <span className=' font-bold text-green-500'>₹ {bookingDetails.event.ticketCost * bookingDetails.quantity}/-</span></h2>
            {/* Proceed to Payment */}
            <div className="payment-action text-center mt-10">
                {loading ? <div className='flex justify-center'><Spinner /> </div> : <button
                    onClick={handlePayment}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white  py-2 px-3 rounded-lg shadow-lg hover:from-red-600 hover:to-red-500 transition duration-300"
                >
                    Proceed to Payment
                </button>
                }

            </div>
        </div>
    );
};

export default CheckoutPage;
