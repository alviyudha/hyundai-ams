import PropTypes from 'prop-types';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ImgSlide = ({ images = [] }) => { 
  const zoomInProperties = {
    scale: 1,
    duration: 5000,
    transitionDuration: 300,
    infinite: true,
    prevArrow: (
      <div className="ml-10 top-20 md:top-72">
        <BiArrowToLeft className="h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div className="mr-10 top-20 md:top-72">
        <BiArrowToRight className="h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
  };

  return (
    <div className="w-full">
      <Zoom {...zoomInProperties}>
        {images.map((image, index) => (
          <div key={index} className="flex justify-center md:items-center items-start w-screen relative">
            <img
              src={image.urlImage}
              className="w-full h-auto"
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Zoom>
    </div>
  );
}

ImgSlide.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      urlImage: PropTypes.string.isRequired,
    })
  ),
};

export default ImgSlide;
