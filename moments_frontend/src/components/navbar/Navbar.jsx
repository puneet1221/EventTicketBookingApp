import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaHeart, FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router'
import { AppContext } from '../AppContext'
import { useCart } from '../Cart/CartContext'
import Spinner from '../LoadingSpinner/Spinner'



const CityBox = () => {
    const { selectedCity, setSelectedCity } = useContext(AppContext);
    useEffect(() => {
        fetch('http://api.geonames.org/searchJSON?q=&country=IN&maxRows=100&username=puneet_69')
            .then(response => response.json())
            .then(data => {
                const cities = data.geonames.map(city => city.name);
                cities.sort();
                setCities(cities);
            })
            .catch(error => console.error('Error:', error));
    }, [])

    const [cities, setCities] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);
    const handleIconClick = () => {
        setIsOpen(prev => !prev);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    // Handle city selection
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsOpen(false);
    };
    // Close dropdown if clicked outside the component
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="relative min-w-[150px] ml-10 px-4 flex items-center justify-around border-2 border-sky-400 rounded-full w-min-[50%] bg-black hover:border-red-600">
            {/* City Dropdown */}
            <div className="relative w-max" ref={dropdownRef} >
                <button
                    onClick={handleIconClick}
                    className="  text-sky-400 font-medium appearance-none  focus:outline-none w-full p-2 rounded-full"
                    aria-label="Select a city"
                >
                    {selectedCity ||'fetching...'}
                </button>
                {isOpen && (
                    <ul className="absolute left-[-30px] h-[30vh] overflow-y-scroll min-w-30 bg-transparent  mt-1">
                        {cities.map((city, i) => (
                            <li
                                key={i}
                                onClick={() => handleCitySelect(city)}
                                className="px-4 py-2 cursor-pointer text-black hover:text-red-600  bg-white"

                            >
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* Map Marker Icon */}
            <FaMapMarkerAlt
                onClick={handleIconClick}
                className="absolute right-[10%] top-1/3 transform -translate-y-1/2 text-3xl text-sky-500 cursor-pointer"
                aria-hidden="true"
            />
        </div>
    );
};

const Navbar = () => {
    const { cartItemsCount } = useCart();
    const { login, logout, city, setCity } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false);
    const { userDetails } = useContext(AppContext);
    const navigate = useNavigate();
    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(prev => !prev);
    }
    window.onclick = () => setShowMenu(false)
    return (
        <nav className=' fixed z-10 w-full px-10 py-3 text-white bg-black m-0 flex justify-between'>
            <div className='flex items-center hover:text-red-500 transition-all duration-200 ease-in'>
                <Link to='/' className='text-3xl font-bold text-white-500 mr-2'>m<FaHeart className='inline-flex text-red-500 text-2xl' />ments</Link>
            </div>
            <div className='flex gap-x-8'>
                <button className='border-2 border-gray-400 rounded-3xl px-4 text-sm hover:text-red-500 hover:border-red-500 transition duration-300'>
                    Todays events!
                </button>
                <button className='border-2 border-gray-400 rounded-3xl text-sm px-3 hover:text-red-500 hover:border-red-500'>
                    Free Events!
                </button>
                <button className='border-2 border-gray-400 rounded-3xl text-sm px-3 hover:text-red-500 hover:border-red-500'>
                    Popular Events
                </button>
                <button onClick={() => navigate('/list-your-event')} className='border-2 py-2 border-gray-400 rounded-3xl text-sm px-3 hover:text-red-500 hover:border-red-500'>List your event</button>
            </div>
            <div className='gap-x-10 flex items-center'>
                <CityBox />
                {
                    login ? <div className='flex gap-x-7 items-center text-gray-200 relative'>
                        {
                            cartItemsCount > 0 &&
                            <>
                                <span className='bg-red-500 w-5 h-5 font-semibold  text-sm text-center  absolute z-11 bottom-[20px]  rounded-full'>{cartItemsCount}</span>
                            </>
                        }
                        <FaCartShopping onClick={() => navigate('/cart')} className='text-2xl hover:text-red-500 cursor-pointer' />
                        <FaUser onClick={toggleMenu} className='text-3xl border border-red-500 rounded-full p-1 text-gray-300 hover:text-red-500 hover:border-red-500' />
                    </div> :
                        <Link to='/login' className='bg-red-600 px-4 py-1  hover:bg-red-800 font-semibold rounded-md '>Login</Link>
                }
            </div>
            {
                showMenu && <div className=' outline-2  w-max left-[90%] top-full rounded-md z-1 bg-white px-3 py-1  mt-0 rounded-lt-200 absolute text-gray-600'>
                    <p onClick={logout} className='border-b-2 border-gray-400 font-medium hover:text-red-600 text-left p-1 text-sm  cursor-pointer '>Logout</p>
                    <p><Link to='/my-bookings' className='border-t-1 font-medium text-left p-1 hover:text-red-500 cursor-pointer  text-sm '>My Bookings!</Link></p>
                    {userDetails && userDetails.role == 'ROLE_ADMIN' && <p className='border-t-1 font-medium text-left p-1 hover:text-red-500 cursor-pointer  text-sm'><Link to='/add-event'>Create Event</Link></p>}

                </div>
            }

        </nav>
    )
}

export default Navbar
