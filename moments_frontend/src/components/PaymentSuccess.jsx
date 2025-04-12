import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { useLocation } from 'react-router';

const PaymentSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search); // Correctly use location.search
  const paymentId = params.get('paymentId'); // Fix: use the string 'paymentId'
  const { userDetails, setUserDetails } = useContext(AppContext);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error messages  
  useEffect(() => {
    if (paymentId && userDetails?.encodedCredentials) {
      fetchUserDetails();
    } else {
        
      setError('Missing payment ID or user credentials.');
    }
  }, [paymentId, userDetails?.encodedCredentials]); // Dependency on paymentId and encodedCredentials

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null); // Reset error before starting the request

    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        {},
        {
          headers: {
            Authorization: `Basic ${userDetails.encodedCredentials}`,
          },
        }
      );

      if (response.data) {
        setUserDetails((prev) => ({
          ...response.data,
          encodedCredentials: prev.encodedCredentials,
          password: prev.password,
        }));
        console.log('User details updated:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to fetch user details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (path) => {
    window.location.href = path;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        {loading && <p className="text-gray-500">Loading...</p>} {/* Show loading */}
        {error && <p className="text-red-500">{error}</p>} {/* Show error message */}

        {!loading && !error && (
          <>
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your transaction has been completed successfully.
            </p>
            <button
              className="px-2 w-max mx-5 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
              aria-label="Go to Home"
              onClick={() => handleRedirect('/')}
            >
              Go to Home
            </button>
            <button
              className="px-3 mx-5 w-max py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              aria-label="Go to My Bookings"
              onClick={() => handleRedirect('/my-bookings')}
            >
              My Bookings
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
