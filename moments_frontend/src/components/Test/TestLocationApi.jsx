import React, { useState } from 'react';
import { getLocationCordinates } from '../../Apis/FetchLatitudeAndLogitude';
const TestLocationApi = () => {
    const [location, setLocation] = useState('')
    const handleOnClick = async (e) => {
        e.preventDefault();
        const a = await getLocationCordinates(location)
        if (a) {
            console.log(a);
        }
    }
    const handleChange = (e) => {
        setLocation(e.target.value)
    }

    return (
        <div className='h-[100vh]'>
            <input type='text' value={location} onChange={handleChange} placeholder='Enter the location'></input>
            <button type='button' onClick={handleOnClick}>Fetcch</button>
        </div>
    )
}


export default TestLocationApi