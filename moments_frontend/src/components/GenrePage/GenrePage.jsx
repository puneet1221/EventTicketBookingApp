import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaBriefcase, FaCalendarAlt, FaChalkboardTeacher, FaFilm, FaFutbol, FaHandsHelping, FaHandshake, FaHeart, FaLaptop, FaMusic, FaPaintBrush, FaRocket, FaTheaterMasks } from 'react-icons/fa';
import { useLocation } from 'react-router';

import EventCard from '../EventCard/EventCard';
import { AppContext } from '../AppContext';
const iconMapping = {
    "Music": FaMusic,
    "Sports": FaFutbol,
    "Conferences": FaChalkboardTeacher,
    "Workshops": FaPaintBrush,
    "Exhibitions": FaFilm,
    "Theater": FaTheaterMasks,
    "Festivals": FaCalendarAlt,
    "Charity": FaHandsHelping,
    "Networking": FaHandshake,
    "Webinars": FaLaptop,
    "Startup Events": FaRocket,
    "Job Fairs": FaBriefcase,
    "Dating": FaHeart,
};


const GenrePage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const obj = location.state || {};
    const { genre, genreIcon, genreIconColor } = obj;
    const {selectedCity}=useContext(AppContext)

    const Icon = iconMapping[genre];


    useEffect(() => {
        console.log(genre)
        axios
            .get(`http://localhost:8080/moments/events?genre=${genre.toLowerCase()}&city=${selectedCity}`)
            .then((response) => {
                setEvents(response.data);
            })
            .catch((err) => {
                console.error('Error fetching events:', err);
                setError('Failed to fetch events. Please try again later.');
            });
    }, [genre]);

    return (
        <div className='min-h-screen py-20 border-2 bg-gray-50 flex-col'>

            <div className="genre-header  flex items-center gap-x-4 p-4">
                {Icon && <Icon className={`text-2xl ${genreIconColor}`} />}
                <h1 className={`text-2xl italic font-bold ${genreIconColor}`}>{genre} events in {selectedCity}</h1>
            </div>
            <div className="event-list h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : events.length > 0 ? (
                    events.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))
                ) : (
                    <p className="text-gray-500">No events found for this genre.</p>
                )}
            </div>

        </div>
    );
};

export default GenrePage;
