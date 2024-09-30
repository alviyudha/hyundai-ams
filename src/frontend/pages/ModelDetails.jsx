import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVehicles } from '../../states/tabtypecars/action';
import { setColorsData } from '../../states/vehicleColors/action';
import { useLocation, useNavigate } from 'react-router-dom';
import HighlightVehiclesComp from '../components/models-detail/HighlightVehiclesComp';
import TabTypeCars from '../components/models-detail/TabTypeCars';
import VehiclesColorsComp from '../components/models-detail/VehiclesColorsComp';
import PromoLeasing from '../components/models-detail/PromoLeasing';
import Warranty from '../components/models-detail/Warranty';
import { getAPI } from '../../libs/api';
import { setHighlightVehicles } from '../../states/highlightVehicles/action';

function ModelDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const highlightVehicles = useSelector((state) => state.highlightVehicles);
  const vehicles = useSelector((state) => state.tabtypeCar.vehicles); // Updated to match reducer name
  const colorsData = useSelector((state) => state.vehicleColor.colorsData); // Updated to match reducer name
  
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [dealerData, setDealerData] = useState([]); // Define dealerData
  const [data, setData] = useState([]); // Define data for warranty

  useEffect(() => {
    const fetchModelData = async () => {
      setLoading(true);
      try {
        const trimId = location.state.trimId;
        const uuid = location.state.id;
  
        const modelData = await getAPI(`alldatamodel/${trimId}`);
        const vehicleData = await getAPI(`modeltrim/${uuid}`);
        const colorsData = await getAPI(`color/trim/${trimId}`);
  
        setDealerData(modelData[0]?.dealers || []);
        setData(modelData);
  
        // Ensure modelData[0] exists and contains the expected properties
        if (modelData && modelData[0]) {
          dispatch(setHighlightVehicles({
            title1: modelData[0].headTitle1 || '',
            text1: modelData[0].text1 || '',
            title2: modelData[0].headTitle2 || '',
            text2: modelData[0].text2 || '',
            title3: modelData[0].headTitle3 || '',
            text3: modelData[0].text3 || '',
            title4: modelData[0].headTitle4 || '',
            text4: modelData[0].text4 || '',
            title5: modelData[0].headTitle5 || '',
            text5: modelData[0].text5 || '',
          }));
        }
  
        dispatch(setVehicles(vehicleData));
        dispatch(setColorsData(colorsData));
  
        setBackgroundImage(modelData[0]?.urlBackgroundImg || '');
      } catch (error) {
        console.error('Error fetching model data:', error);
        navigate('/maintenance');
      } finally {
        setLoading(false);
      }
    };
  
    fetchModelData();
  }, [location.state.trimId, location.state.id, navigate, dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex w-52 flex-col gap-4 items-center justify-center">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <img src={backgroundImage} alt="Hyundai AMS" className='img-fluid d-block w-100' />
      {highlightVehicles && <HighlightVehiclesComp {...highlightVehicles} />}
      {vehicles.length > 0 && <TabTypeCars vehicles={vehicles} />}
      {colorsData.length > 0 && <VehiclesColorsComp colorsData={colorsData} />}
      {dealerData.length > 0 && <PromoLeasing dealers={dealerData} />}
      {data.length > 0 && <Warranty warranty={data[0]?.urlWarrantyImg} />} {/* Make sure data is structured correctly */}
    </div>
  );
}

export default ModelDetails;
