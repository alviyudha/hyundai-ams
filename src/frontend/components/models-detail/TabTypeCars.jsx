import PropTypes from 'prop-types';
import {  useNavigate } from 'react-router-dom';

function TabTypeCars({ vehicles }) {
  const navigate = useNavigate();

  const handleImageClick = (vehicle) => {
    navigate(`/models/${vehicle.Cars}`, { state: { id: vehicle.vehicleId,trimId: vehicle.trimId } });
  };
  return (
    <div className='mx-auto md:w-1/2 flex justify-center items-center sticky top-0 z-30 bg-white shadow-inner'>
  <div className='mt-2 flex flex-wrap justify-center'>
    {vehicles.map(vehicle => (
      <button
        key={vehicle.id}
        onClick={() => handleImageClick(vehicle)}
        className='bg-neutral-50 text-hyundai shadow py-2 px-3 rounded hover:bg-hyundai hover:text-neutral-200 transition-all duration-500 m-2 uppercase'
      >
        {vehicle.trim}
      </button>
    ))}
  </div>
</div>
  );
}

TabTypeCars.propTypes = {
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      trim: PropTypes.string.isRequired,
      vehicleId: PropTypes.string.isRequired,
      trimId: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default TabTypeCars
