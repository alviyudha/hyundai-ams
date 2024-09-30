import PropTypes from 'prop-types';



 function HighlightVehiclesComp({ title1, text1, title2, text2, title3, text3, title4, text4, title5, text5 }) {
  return (
    <div className=' text-white'>
  <div className="container mx-auto m-10">
    <div className="flex flex-wrap justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6 bg-gray-100 p-6 rounded-lg shadow-2xl">
      <div className="w-full sm:w-1/5 text-center sm:text-left bg-hyundai p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
        <ul>
          <li><p className="font-medium text-gray-100">{title1}</p></li>
          <li><p className="text-lg uppercase font-bold text-white">{text1}</p></li>
        </ul>
      </div>
      <div className="w-full sm:w-1/5 text-center sm:text-left bg-hyundai p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
        <ul>
          <li><p className="font-medium text-gray-100">{title2}</p></li>
          <li><p className="font-bold text-white">{text2}</p></li>
        </ul>
      </div>
      <div className="w-full sm:w-1/5 text-center sm:text-left bg-hyundai p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
        <ul>
          <li><p className="font-medium text-gray-100">{title3}</p></li>
          <li><p className="font-bold text-white">{text3}</p></li>
        </ul>
      </div>
      <div className="w-full sm:w-1/5 text-center sm:text-left bg-hyundai p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
        <ul>
          <li><p className="font-medium text-gray-100">{title4}</p></li>
          <li><p className="font-bold text-white">{text4}</p></li>
        </ul>
      </div>
      <div className="w-full sm:w-1/5 text-center sm:text-left bg-hyundai p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 m-3">
        <ul>
          <li><p className="font-medium text-gray-100">{title5}</p></li>
          <li><p className="font-bold text-white">{text5}</p></li>
        </ul>
      </div>
    </div>
  </div>
</div>


  
  );
}

HighlightVehiclesComp.defaultProps = {
  title1: '',
  text1: '',
  title2: '',
  text2: '',
  title3: '',
  text3: '',
  title4: '',
  text4: '',
  title5: '',
  text5: '',
};
export default HighlightVehiclesComp