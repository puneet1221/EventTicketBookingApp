import React from 'react';

const PaymentCancelled = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-sm text-gray-700 mb-6">
          Unfortunately, your payment was not successful. Please try again or contact support for further assistance.
        </p>
      
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-md font-medium  hover:bg-red-700 transition duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentCancelled;
