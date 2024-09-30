import React from 'react';
import { FaFacebookF, FaInstagram, FaTools, FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function UnderMaintenance() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <FaTools className="text-gray-400 text-6xl mb-4 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">We'll be back soon!</h1>
        <p className="text-gray-600 mb-6">
          Our site is currently undergoing scheduled maintenance. We apologize for any inconvenience and appreciate your patience. Please check back later.
        </p>
        <p className="text-gray-600 mb-6">
          Please come back in a few minutes.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kembali
        </button>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-3">
            <FaFacebookF className="text-gray-400 text-2xl cursor-pointer hover:text-gray-600" />
            <FaInstagram className="text-gray-400 text-2xl cursor-pointer hover:text-gray-600" />
            <FaWhatsapp className="text-gray-400 text-2xl cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
