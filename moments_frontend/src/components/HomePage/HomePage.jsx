import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import EventGenre from '../Genre/EventGenre'
import Main from '../Main/Main'
import Footer from '../footer/Footer'
import Hero from '../hero/Hero'
import Navbar from '../navbar/Navbar'

const HomePage = () => {
    const { eventsList, setEventsList } = useContext(AppContext);
    const events=eventsList.slice(0,10)
    return (
        <>
            <Navbar />
            <Hero events={events} setEvents={setEventsList} />
            <EventGenre />
            <Main eventsList={eventsList}/>
            <Footer />

        </>
    )
}

export default HomePage