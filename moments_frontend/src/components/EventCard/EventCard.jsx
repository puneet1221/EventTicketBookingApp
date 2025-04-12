import React from 'react';
import { FaCalendar, FaMapPin } from 'react-icons/fa';
import { FaMapLocation } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() =>
                navigate('/event-page', {
                    state: {
                        event: event
                    },
                })
            }
            className="border border-gray-300 w-5/6 bg-white rounded-lg shadow-lg transition-shadow duration-300 cursor-pointer"
        >
            <img
                className="w-full h-48 object-cover mb-2"
                src={event.bannerUrl || "https://via.placeholder.com/300x200"} // Fallback image
                alt="Event"
            />
            <div className="px-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name || "Event Details"}</h3>
                <p className="text-sm text-gray-600 mb-4">{event.about || "No description available."}</p>

                <p className="flex gap-x-2 items-center text-gray-500 mb-2">
                    <FaMapPin className="text-red-600 text-lg" /> {event.address?.venue || "Venue not specified"}
                </p>

                <p className="flex gap-x-2 items-center text-gray-500">
                    <FaCalendar className="text-black-500" /> {event.dateTime ? new Date(event.dateTime).toLocaleString() : "Date not provided"}
                </p>
            </div>
            <div className="flex justify-between items-center rounded m-2 bg-red-200 p-2 mt-2">
                <span className="text-black font-semibold">{event.ticketCost ? `₹${event.ticketCost}` : "Free!"}</span>
                <span className="text-black font-semibold border-l-2 border-red-500 px-2 cursor-pointer hover:text-red-600 transition duration-300">
                    Buy Now
                </span>
            </div>
        </div>
    );
};

export default EventCard;
