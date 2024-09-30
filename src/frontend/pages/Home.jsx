import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TabProdukComp from '../components/Home/TabProdukComp';
import ImgSlide from '../components/Home/imgSlide';
import { getAPI } from '../../libs/api';
import { fetchImagesFailure, fetchImagesRequest, fetchImagesSuccess } from '../../states/imgSlide/action';

function Home() {
  const { images } = useSelector((state) => state.imgSlide);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      dispatch(fetchImagesRequest());
      try {
        const data = await getAPI('imgslide');
        dispatch(fetchImagesSuccess(data));
      } catch (error) {
        console.error('Error fetching images:', error);
        dispatch(fetchImagesFailure(error));
        navigate('/maintenance');
      }
    };

    fetchImages();
  }, [dispatch, navigate]);

  return (
    <div>
      <ImgSlide images={images} />
      <TabProdukComp />
    </div>
  );
}

export default Home;
