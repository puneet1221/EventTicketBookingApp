import React, { useState } from 'react';
import {
    FaBriefcase, FaCalendarAlt, FaChalkboardTeacher, FaFilm, FaFutbol, FaHandsHelping,
    FaHandshake, FaHeart, FaLaptop, FaMusic, FaPaintBrush, FaRocket, FaTheaterMasks
} from 'react-icons/fa';
import { useNavigate } from 'react-router';

const EventGenre = () => {
    const [genres, setGenres] = useState([
        'Music', 'Sports', 'Conferences', 'Workshops', 'Exhibitions', 'Theater',
        'Festivals', 'Charity', 'Networking', 'Webinars', 'Startup', 'JobFairs', 'Dating'
    ]);
    const navigate = useNavigate();
    const iconMapping = {
        "Music": { icon: FaMusic, color: 'text-blue-400' },
        "Sports": { icon: FaFutbol, color: 'text-green-500' },
        "Conferences": { icon: FaChalkboardTeacher, color: 'text-indigo-500' },
        "Workshops": { icon: FaPaintBrush, color: 'text-purple-500' },
        "Exhibitions": { icon: FaFilm, color: 'text-gray-500' },
        "Theater": { icon: FaTheaterMasks, color: 'text-orange-500' },
        "Festivals": { icon: FaCalendarAlt, color: 'text-pink-500' },
        "Charity": { icon: FaHandsHelping, color: 'text-teal-500' },
        "Networking": { icon: FaHandshake, color: 'text-cyan-500' },
        "Webinars": { icon: FaLaptop, color: 'text-blue-700' },
        "Startup": { icon: FaRocket, color: 'text-red-500' },
        "JobFairs": { icon: FaBriefcase, color: 'text-yellow-800' },
        "Dating": { icon: FaHeart, color: 'text-red-600' }
    };

    const handleClick = (item) => {
        navigate(`events/genre/${item}`, {
            state: {
                genre: item,
                genreIcon: iconMapping[item].icon + "",
                genreIconColor: iconMapping[item].color
            }
        });
    };

    return (
        <div className='pt-10'>
            <h1 className="text-center text-2xl font-bold mb-6">Select from a Genre</h1>
            <div className="grid grid-cols-5 gap-x-[4%] gap-y-6 px-[6%] py-6">
                {
                    genres.map((item, index) => {
                        const { icon: IconComponent, color } = iconMapping[item];  // Get the icon and color class
                        return (
                            <div
                                key={index}
                                onClick={() => handleClick(item)}  // Use the handler function
                                className="outline items-center flex gap-x-3 outline-2 hover:outline-red-600 outline-gray-300 outline-thin text-center text-lg font-semibold rounded-lg p-4 shadow-md cursor-pointer"
                            >
                                <div className={`text-2xl ${color} mb-2`}>
                                    <IconComponent /> {/* Render the icon with the dynamic color */}
                                </div>
                                <div>{item}</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default EventGenre;
