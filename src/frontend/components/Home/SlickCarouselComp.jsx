import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

export default function SlickCarouselComp({ type, carsData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 300,
    autoplaySpeed: 2000,
    autoplay: false,
    centerMode: true,
    centerPadding: "0",
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number)
  }

  const slidesData = React.useMemo(() => {
    if (carsData.length > 0) {
      if (carsData.length < 4) {
        return [...carsData, ...carsData];
      }
      return carsData;
    }
    return [];
  }, [carsData]);

  if (!slidesData.length) {
    return <div>Loading...</div>;
  }

  if (slidesData.length === 3) {
    const duplicatedImage = { ...slidesData[0] };
    slidesData.push(duplicatedImage);
  } else if (slidesData.length === 2) {
    const duplicatedImages = [...slidesData, ...slidesData];
    slidesData.push(...duplicatedImages);
  } else if (slidesData.length === 1) {
    const duplicatedImages = [...slidesData, ...slidesData];
    slidesData.push(...duplicatedImages);
  }

  const handleClick = () => {
    const vehicle = slidesData[currentSlide];
    navigate(`/models/${vehicle.Link}`, { state: { id: vehicle.uuid, trimId: vehicle.trimId } });
  };

  return (
    <div id='slideCars'>
      <div className="bg-color-pruduct">
        <div className="container p-5 mb-5">
          <Slider {...settings}>
            {slidesData.map((slide, index) => (
              <div key={index}>
                <img src={slide.urlImgView} alt={slide.model} className="p-3" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="caption-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-2">
              <ul>
                <li><p className='text-color-primary'>{slidesData[currentSlide].year}</p></li>
                <li><p className='fs-5 text-uppercase text-color-primary fw-bolder'>{slidesData[currentSlide].model}</p></li>
                <li><p className='text-color-primary'>{slidesData[currentSlide].type}</p></li>
              </ul>
            </div>
            <div className="col-md-2">
            <ul>
                <li><p className='fw-medium'>Price</p></li>
                <li><p className='text-color-primary fw-bold'>{formatNumber(slidesData[currentSlide].otrPrice)}</p></li>
              </ul>
            </div>
            <div className="col-md-2">
              <ul>
                <li><p className='fw-medium'>{slidesData[currentSlide].headTitle1}</p></li>
                <li><p className='text-color-primary fw-bold'>{slidesData[currentSlide].text1}</p></li>
              </ul>
            </div>
            <div className="col-md-2">
              <ul>
                <li><p className='fw-medium'>{slidesData[currentSlide].headTitle2}</p></li>
                <li><p className='text-color-primary fw-bold'>{slidesData[currentSlide].text2}</p></li>
              </ul>
            </div>
            <div className="col-md-2">
              <ul>
                <li><p className='fw-medium'>{slidesData[currentSlide].headTitle3}</p></li>
                <li><p className='text-color-primary fw-bold'>{slidesData[currentSlide].text3}</p></li>
              </ul>
            </div>
            <div className="col-md-2">
              <ul>
                <button className="custom-btn btn-12" onClick={handleClick}><span>Click!</span><span>Read More</span></button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
