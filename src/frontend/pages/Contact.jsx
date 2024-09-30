import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { getAPI } from '../../libs/api';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [dataDealers, setDataDealers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAPI('dealer')
      .then(data => {
        setDataDealers(data);
      })
      .catch(error => {
        console.error('Failed to load data:', error);
        navigate('/maintenance');
      });
  }, [navigate]);

  return (
    <div id='CardDealer'>
      <div className='flex justify-center items-center border-y p-5'>
        <h3 className='text-xl font-semibold text-hyundai '>Our Dealerships Auto Maju Sentosa</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4 p-10">
        {dataDealers.map(dealer => (
          <div key={dealer.id} className="max-w-sm rounded-lg dark:border-gray-700 shadow hover:shadow-hyundai transition-all duration-500 hover:rotate-1">
            <img src={dealer.urlImageDealer || '/placeholder-image.png'} alt={dealer.name} className="rounded-t-lg"/>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hyundai">{dealer.name}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{dealer.address}</p>
              <div className="flex justify-center space-x-4 mt-4">
                {dealer.urlFacebook && (
                  <a href={dealer.urlFacebook} target="_blank" rel="noopener noreferrer" >
                    <FaFacebookF />
                  </a>
                )}
                {dealer.urlInstagram && (
                  <a href={dealer.urlInstagram} target="_blank" rel="noopener noreferrer" >
                    <FaInstagram />
                  </a>
                )}
                {dealer.whatsapp && (
                  <a href={`https://wa.me/${dealer.whatsapp}`} target="_blank" rel="noopener noreferrer" >
                    <FaWhatsapp />
                  </a>
                )}
                {dealer.urlMaps && (
                  <a href={dealer.urlMaps} target="_blank" rel="noopener noreferrer" >
                    <FaLocationDot />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
