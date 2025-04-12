import React, { useContext, useState } from "react";
import { FaPenSquare, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../AppContext";
import { useCart } from "./CartContext";

const EmptyCart = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <FaShoppingCart className="text-6xl text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-3">Your Cart is Empty</h2>
            <p className="text-md text-gray-500 mb-4">It looks like you haven't saved anything for later !</p>
        </div>
    );
};




const Cart = () => {
    const { cartItems, handleRemoveCartItem } = useCart();
    const [activeItem, setActiveItem] = useState(null);
    const { formatDateTime } = useContext(AppContext);
    const navigate = useNavigate();
    const closeDetails = () => {
        setActiveItem(null);
    };


    if (cartItems.length==0) {
        return <>
            <EmptyCart></EmptyCart>
        </>
    }
    else {
        return (<div className="p-6 min-h-[85vh] bg-gray-100">
            <h1 className="text-gray-500 text-md font-thin text-center mt-10">
                Saved Items!
            </h1>

            {cartItems.map((item, index) => (
                <div
                    key={`${item.event.eventId}-${index}`}
                    className="flex items-center bg-white border border-gray-300 rounded-lg p-4 my-4 shadow-sm"
                >
                    {console.log(item)}

                    <img
                        src={item.event.bannerUrl}
                        alt={`${item.event.name} banner`}
                        className="w-[15%] h-[100px] object-cover rounded-lg"
                    />
                    <div className="flex-1 px-10">
                        <h2 className="text-lg font-semibold text-gray-800">{item.event.name}</h2>
                        <p className="text-gray-600">Date: {formatDateTime(item.event.dateTime)}</p>
                        <p className="text-gray-600">Venue: {item.event.address.venue},{item.event.address.city}</p>
                        <p className="text-gray-600">Cost: ₹{item.event.ticketCost} per person</p>
                    </div>
                    <div className="w-[20%] px-4">
                        <p className="text-sm font-medium text-gray-800">
                            Total: ₹
                            {item.guestList.length * item.event.ticketCost === 0
                                ? "Free"
                                : item.guestList.length * item.event.ticketCost}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mr-6">
                        <FaPenSquare
                            className="text-green-500 text-2xl cursor-pointer hover:scale-110 transition"
                            title="Edit Event"
                            onClick={() => setActiveItem(item)}
                        />
                        <FaTrash
                            className="text-red-500 text-2xl cursor-pointer hover:text-red-700 transition"
                            onClick={() => handleRemoveCartItem(item.id)}
                            title="Remove Event"
                        />
                        {item.event.availableTickets > item.guestList.length ? (
                            <button onClick={() => {
                                navigate('/checkout', {
                                    state: { bookingDetails: item }
                                })
                            }}
                                title="checkout"
                                className="bg-sky-500 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-sky-600 transition"
                            >
                                Book Now
                            </button>
                        ) : (
                            <button
                                title="checkout"
                                className="bg-gray-400 text-white px-4 py-2 text-sm font-medium rounded-md"
                                disabled
                            >
                                Not enough Seats!
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {activeItem && <CartItemDetails cartItem={activeItem} closeDetails={closeDetails} />}
        </div>);
    }
};

const CartItemDetails = ({ cartItem, closeDetails }) => {
    return (
        <div className="fixed   inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-[90vw] md:w-[50vw] max-h-[80vh] rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {cartItem.event.name} Booking Details
                    </h2>
                    <button
                        onClick={closeDetails}
                        className="text-red-500 text-lg font-bold hover:text-red-700 transition"
                        aria-label="Close"
                    >
                        X
                    </button>
                </div>
                <div className="overflow-y-auto h-[60vh] px-6 py-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">#</th>
                                <th className="py-2 px-4">Guest Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItem.guestList.map((guest, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                                >
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">
                                        {guest.fname} {guest.lname}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Cart;
