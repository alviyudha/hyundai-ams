import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <FaExclamationTriangle className="text-red-500 mx-auto mb-4 text-6xl" />
        <h1 className="text-3xl font-bold text-hyundai mb-4">
          Oops! Something Went Wrong
        </h1>
        <p className="text-hyundai dark:text-gray-300 mb-6">
          We’re sorry, but the page you’re looking for doesn’t exist or an unexpected error occurred.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
