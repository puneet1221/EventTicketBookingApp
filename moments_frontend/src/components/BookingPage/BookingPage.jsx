import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import { useCart } from '../Cart/CartContext';


// select the no of tickers
const SetNoOfTickets = ({ errorMsg, noOfTickets, setNoOfTickets, setErrorMsg, goToNextStep }) => {

    const increment = () => {
        if (noOfTickets < 5) {
            setNoOfTickets((prev) => prev + 1);
            setErrorMsg('');
        } else {
            setErrorMsg('Only 5 bookings allowed at a time!');
        }
    };

    const decrement = () => {
        if (noOfTickets > 1) {
            setNoOfTickets((prev) => prev - 1);
            setErrorMsg('');
        }
    };

    return (
        <div className="h-screen flex items-center text-gray-600 justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border">
                <h1 className="text-lg font-semibold mb-6 text-center">Select Number of Tickets</h1>
                <div className="flex items-center self-center justify-around mb-4">
                    <div className="gap-x-5 flex text-center">
                        <button
                            onClick={decrement}
                            aria-label="Decrease ticket count"
                            className="p-3 bg-gray-200 rounded-full text-red-600 hover:bg-gray-300"
                        >
                            <FaMinus />
                        </button>
                        <span className="text-xl text-center font-semibold">{noOfTickets}</span>
                        <button
                            onClick={increment}
                            aria-label="Increase ticket count"
                            className="p-3 bg-gray-200 rounded-full text-green-600 hover:bg-gray-300"
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <button
                    onClick={goToNextStep}
                    className='w-full py-2 text-white font-semibold rounded-md bg-red-600 hover:bg-red-700'
                >
                    Next
                </button>
                {errorMsg && (
                    <div className="h-5 py-2">
                        <p className="text-red-600 text-sm text-center mb-4">{errorMsg}</p>
                    </div>
                )}
            </div>
        </div >
    );
};

/*  filling the guest details for events */
const GuestDetails = ({ navigate, noOfTickets, guestList, handleAddCartItem, event, setUserDetails, goToPreviousStep, handleSubmit }) => {
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) =>
            prevDetails.map((detail, i) => (i === index ? { ...detail, [name]: value } : detail))
        );
    };

    /*  if user want to book later  */
    const handleAddToCart = () => {
        handleAddCartItem({
            event: event,
            quantity: noOfTickets,
            guestList: guestList
        })
        setTimeout(() => {
            navigate('/cart')
        }, 500);
    }
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border">
                <h1 className="text-lg font-semibold mb-6 text-center">Enter Guest Details</h1>
                {Array.from({ length: noOfTickets }).map((_, index) => (
                    <div key={index} className="mb-4">
                        <label htmlFor={`guest-${index}`} className="block text-gray-700 font-medium">
                            Guest {index + 1}
                        </label>
                        <div className="flex gap-x-4">
                            <input
                                type="text"
                                name="fname"
                                id={`guest-${index}`}
                                value={guestList[index]?.fname || ''}
                                onChange={(e) => handleInputChange(e, index)}
                                className="w-1/2 p-3 border focus:ring-2 focus:ring-red-500 border-gray-300 rounded-md"
                                placeholder="First Name"
                                required
                            />
                            <input
                                type="text"
                                name="lname"
                                value={guestList[index]?.lname || ''}
                                onChange={(e) => handleInputChange(e, index)}
                                className="w-1/2 p-3 border focus:ring-2 focus:ring-red-500 border-gray-300 rounded-md"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                        Back
                    </button>

                    <button onClick={handleAddToCart}
                        type='button' className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700'
                    >Book Later</button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-700"

                    >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
};

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {};

    const { handleAddCartItem } = useCart();
    const [noOfTickets, setNoOfTickets] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');
    const [formStep, setFormStep] = useState(1);
    const [guestList, setUserDetails] = useState([]);

    const goToNextStep = () => {
        setFormStep(2);
        setUserDetails(Array(noOfTickets).fill({ fname: '', lname: '' }));
    };

    const goToPreviousStep = () => {
        setFormStep(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFilled = guestList.every(
            (detail) => detail.fname.trim() && detail.lname.trim()
        );
        if (!allFilled) {
            alert('Please fill in all guest details.');
            return;
        }

        navigate('/checkout', {
            state: {
                bookingDetails: {
                    event: event,
                    guestList: guestList,
                    quantity: noOfTickets
                }
            }
        })
    };

    return (
        <div>
            {formStep === 1 && (
                <SetNoOfTickets
                    noOfTickets={noOfTickets}
                    setNoOfTickets={setNoOfTickets}
                    setErrorMsg={setErrorMsg}
                    goToNextStep={goToNextStep}
                    errorMsg={errorMsg}
                />
            )}
            {formStep === 2 && (
                <GuestDetails
                    noOfTickets={noOfTickets}
                    guestList={guestList}
                    setUserDetails={setUserDetails}
                    goToPreviousStep={goToPreviousStep}
                    handleSubmit={handleSubmit}
                    handleAddCartItem={handleAddCartItem}
                    event={event}
                    navigate={navigate}
                />
            )}
        </div>
    );
};

export default BookingPage;
