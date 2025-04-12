import React, { useContext, useEffect, useState } from 'react';
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import { AppContext } from '../AppContext';

const MyBookings = () => {
    const { userDetails } = useContext(AppContext);
    const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        if (userDetails.bookedEventsTickets) {
            setBookingsData(userDetails.bookedEventsTickets);
        }
    }, [userDetails]);

    const donwloadTicket = (ticketId) => {
        console.log("clicked" + ticketId);

        fetch(`http://localhost:8080/event/${ticketId}/ticket-download`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${userDetails.encodedCredentials}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob(); 
            })
            .then((blob) => {
                const link = document.createElement('a');  // Create a link element
                link.href = URL.createObjectURL(blob);  // Create a URL for the Blob data
                link.download = 'ticket.pdf';  // Specify the file name for download
                link.click();  // Programmatically click the link to trigger the download
            })
            .catch((error) => {
                console.error('Error downloading ticket:', error);  // Log any errors
            });
    };


    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <h1 className="text-2xl font-bold text-center text-gray-600 mt-12 mb-8">My Bookings</h1>
            <div className="max-w-4xl mx-auto px-4">
                {bookingsData.length === 0 ? (
                    <div className="text-center text-xl text-gray-600">You don't have any bookings yet.</div>
                ) : (
                    bookingsData.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white shadow-md px-6 py-4 border mb-4 rounded-lg"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-xl font-semibold text-gray-800">{booking.event.name}</h2>
                                <p
                                    className={`text-xs font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' :
                                        booking.status === 'Pending' ? 'text-yellow-500' :
                                            'text-red-600'}`}
                                >
                                    {booking.status}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <FaCalendar />
                                <span>{new Date(booking.event.dateTime).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <FaMapMarkerAlt />
                                <span>{booking.event.address.venue}, {booking.event.address.city}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <FaTicketAlt />
                                <span>₹{booking.event.ticketCost * booking.guestList.length}</span>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <button className="bg-sky-500 text-white text-sm px-3 py-1 rounded-lg shadow-md">
                                    Booked
                                </button>
                                <FaDownload onClick={() => donwloadTicket(booking.id)} title="Click to download" className="text-2xl text-gray-500 cursor-pointer" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBookings;
