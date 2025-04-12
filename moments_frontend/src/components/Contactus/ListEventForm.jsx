import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HostEventForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    useEffect(() => {
        if (isSubmitted) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Event Submitted: ", formData);
        setIsSubmitted(true); // Show the popup
        setFormData({
            title: "",
            description: "",
            date: "",
            time: "",
            location: "",
            contactName: "",
            contactEmail: "",
            contactPhone: "",
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        //submit the details to admin
    };

    const handleClosePopup = () => {
        setIsSubmitted(false); // Hide the popup
        navigate("/"); // Redirect to the homepage
    };

    return (
        <div className="h-[100%] bg-gray-100 p-10 relative">
            <div className="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-sky-500">Host Your Event</h2>
                <p className="text-gray-600 text-center mb-6 text-lg text-gray-500 font-semibold">
                    Fill out the form & we will soon reach to you!.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Title */}
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium">
                            Event Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the event title"
                            required
                        />
                    </div>
                    {/* Event Description */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium">
                            Event Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe your event"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    {/* Event Date */}
                    <div>
                        <label htmlFor="date" className="block text-gray-700 font-medium">
                            Event Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {/* Event Time */}
                    <div>
                        <label htmlFor="time" className="block text-gray-700 font-medium">
                            Event Time:
                        </label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {/* Event Location */}
                    <div>
                        <label htmlFor="location" className="block text-gray-700 font-medium">
                            Event Location:
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the location"
                            required
                        />
                    </div>
                    {/* Contact Information */}
                    <h3 className="text-lg font-semibold text-gray-800 mt-6">Contact Information</h3>
                    <div>
                        <label htmlFor="contactName" className="block text-gray-700 font-medium">
                            Contact Name:
                        </label>
                        <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contactEmail" className="block text-gray-700 font-medium">
                            Contact Email:
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contactPhone" className="block text-gray-700 font-medium">
                            Contact Phone:
                        </label>
                        <input
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <button
                        type="button" onClick={handleSubmit}
                        className="w-max py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Submit Event
                    </button>
                </form>
            </div>

            {isSubmitted && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-xl font-bold text-green-600 mb-2">Submitted Successfully!</h2>
                        <p className="text-gray-600 mb-4">We will reach out to you soon.</p>
                        <button
                            onClick={handleClosePopup}
                            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-red-700 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HostEventForm;
