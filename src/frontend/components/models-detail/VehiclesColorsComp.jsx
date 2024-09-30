import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { getAPI } from '../../../libs/api';

function VehiclesColorsComp() {
  const [colorsData, setColorsData] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState('');
  const [currentDescColor, setCurrentDescColor] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { trimId } = location.state || {}; // Get trimId from location state
        if (trimId) {
          const data = await getAPI(`alldatamodel/${trimId}`);
         

          // Set colors data
          setColorsData(data);

          // Set default image and other details if available
          if (data.length > 0) {
            setCurrentImage(data[0].urlcolorsImage || '');
            setCurrentBackgroundColor(data[0].backgroundColor || '');
            setCurrentDescColor(data[0].descColor || '');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.state]);

  const changeImage = (newImage, newBackgroundColor, newDescColor) => {
    setCurrentImage(newImage);
    setCurrentBackgroundColor(newBackgroundColor);
    setCurrentDescColor(newDescColor);
  };

  return (
    <div className='mx-auto my-10 max-w-screen-lg'>
      <div className="text-center mt-5">
        <h3 className='font-bold text-4xl mb-2 text-shadow'>Discover Your Dream Car</h3>
        <p className='text-lg text-gray-600'>Choose from a variety of exterior colors</p>
      </div>
      <div className="mt-5 rounded-lg overflow-hidden shadow-xl">
        <div className="rounded bg-gradient-to-r from-gray-200 via-white to-gray-200 text-center drop-shadow-2xl">
          <img src={currentImage} alt="Car" className='mx-auto hover:scale-105 transition-all duration-500' style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        </div>
        <div className="text-center mt-5 mb-5">
          <div className="flex flex-wrap justify-center mt-5">
            {colorsData.map((color, index) => (
              <button
                key={index}
                onClick={() => changeImage(color.urlcolorsImage, color.backgroundColor, color.descColor)}
                className="p-4 m-2 btn-colors shadow-lg-hyundai bg-gray-200 hover:scale-105 hover:shadow-md hover:shadow-hyundai transition-all duration-300 rounded-full"
                style={{ background: color.backgroundColor, minWidth: '60px', minHeight: '60px', maxWidth: '80px', maxHeight: '80px' }}
              ></button>
            ))}
          </div>
          <div className='container mx-auto mt-8'>
            <table className='min-w-full bg-white border border-gray-200'>
              <tbody>
                <tr className='border-b'>
                  <td className='font-bold p-4 bg-gray-100'>Exterior Color</td>
                  <td className='capitalize font-bold p-4 bg-gray-50'>{currentDescColor}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold p-4 bg-gray-100'>Trim Level</td>
                  <td className='capitalize font-bold p-4 bg-gray-50'>{colorsData[0]?.trim || 'N/A'}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold p-4 bg-gray-100'>Price</td>
                  <td className='capitalize font-bold p-4 bg-gray-50'>Rp. {colorsData[0]?.otrPrice?.toLocaleString() || 'N/A'}</td>
                </tr>
                <tr>
                  <td className='font-bold p-4 bg-gray-100'>Brochure</td>
                  <td className='p-4 bg-gray-50 flex items-center justify-center'>
                    <a href={colorsData[0]?.urlBrochure || '#'} className='flex items-center text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faDownload} className='mr-2' />Download
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

VehiclesColorsComp.propTypes = {
  colorsData: PropTypes.arrayOf(
    PropTypes.shape({
      urlcolorsImage: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      descColor: PropTypes.string.isRequired,
      trim: PropTypes.string,
      otrPrice: PropTypes.number,
      urlBrochure: PropTypes.string,
    })
  ).isRequired,
};
export default VehiclesColorsComp