import React from 'react'
import { Route, Routes } from 'react-router'
import AddEvent from './components/Admin/AddEvent'
import BookingPage from './components/BookingPage/BookingPage'
import CheckoutPage from './components/BookingPage/CheckOutPage'
import Cart from './components/Cart/Cart'
import ListEventForm from './components/Contactus/ListEventForm'
import EventPage from './components/EventPage/EventPage'
import Footer from './components/footer/Footer'
import GenrePage from './components/GenrePage/GenrePage'
import HomePage from './components/HomePage/HomePage'
import Login from './components/Login/Login'
import ForgotPassword from './components/Login/PasswordReset'
import Register from './components/Login/Register'
import MyBookings from './components/MyBookings/MyBookings'
import Navbar from './components/navbar/Navbar'
import PaymentCancelled from './components/PaymentCancelled'
import PaymentSuccess from './components/PaymentSuccess'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Spinner from './components/LoadingSpinner/Spinner'
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={
          <>
            <HomePage />
          </>
        }></Route>

        <Route path='/login' element={<>
          <Navbar />
          <Login />
          <Footer />
        </>} />
        <Route path='/register' element={
          <> <Navbar />
            <Register />
            <Footer /></>

        } />

        <Route path='/reset-password' element={
          <> <Navbar />
            <ForgotPassword />
            <Footer /></>

        } />
        <Route path='/event-page' element={
          <>
            <Navbar />
            <EventPage />
            <Footer />
          </>
        }>
        </Route>

        <Route path='/events/genre/:genrename' element={
          <>
            <Navbar />
            <GenrePage />
            <Footer />
          </>

        }></Route>

        <Route path='/my-bookings' element={
          <>
            <Navbar></Navbar>
            <MyBookings />
            <Footer />

          </>
        }></Route>

        <Route path='/event/book-event' element={
          <> <Navbar></Navbar>
            <BookingPage />
            <Footer /></>
        } />
        <Route path='/cart' element={
          <>
            <Navbar></Navbar>
            <Cart />
            <Footer /></>
        } />

        <Route path="/checkout" element={<>
          <Navbar />
          <CheckoutPage />
          <Footer />
        </>}></Route>

        <Route path='/list-your-event' element={
          <>
            <Navbar></Navbar>
            <ListEventForm />
            <Footer /></>

        } />
        <Route path='/payment-cancelled' element={
          <>
            <PaymentCancelled />
          </>
        }></Route>

        <Route path='/payment-success' element={
          <PaymentSuccess />
        }></Route>

        <Route path='/add-event' element={
          <>
            <Navbar></Navbar>
            <AddEvent />
            <Footer />
          </>
        } />
      </Routes>
    </>

  )
}

export default App