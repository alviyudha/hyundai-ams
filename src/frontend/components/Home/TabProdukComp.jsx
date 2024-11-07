import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SlickCarouselComp from "./SlickCarouselComp";
import LoadingSpinner from "../LoadingSpinner";
import { getAPI } from "../../../libs/api";
import {
  fetchCarsFailure,
  fetchCarsRequest,
  fetchCarsSuccess,
} from "../../../states/tabProduct/action";
  
const filterUniqueModels = (data) => {
  const uniqueModels = {};
  data.forEach((vehicle) => {
    if (!uniqueModels[vehicle.model]) {
      uniqueModels[vehicle.model] = vehicle;
    }
  });
  return Object.values(uniqueModels);
};

export default function TabProdukComp() {
  const { carsData, loading, activeKey } = useSelector(
    (state) => state.tabProduk
  );
  const dispatch = useDispatch();

  const fetchData = async (typecar) => {
    dispatch(fetchCarsRequest());
    try {
      const response = await getAPI(`/modeldetail/${typecar}`);
      const filteredData = filterUniqueModels(response);
      dispatch(fetchCarsSuccess(filteredData));
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(fetchCarsFailure(error));
    }
  };

  useEffect(() => {
    fetchData("ev");
  }, [dispatch]);

  const handleSelect = (key) => {
    dispatch({ type: "SET_ACTIVE_KEY", payload: key });
    let typecar;
    switch (key) {
      case "Electrified":
        typecar = "ev";
        break;
      case "SUV":
        typecar = "suv";
        break;
      case "MPV":
        typecar = "mpv";
        break;
      default:
        typecar = "ev";
    }
    fetchData(typecar);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      id="tabProduct"
      data-aos="zoom-out-right"
      data-aos-duration="1000"
      className="mb-5 container shadow-sm p-5"
    >
      <Tabs
        activeKey={activeKey}
        onSelect={handleSelect}
        id="fill-tab-example"
        className="mb-3 mt-5"
        fill
      >
        <Tab eventKey="Electrified" title="Electrified">
          <SlickCarouselComp type="ev" carsData={carsData} />
        </Tab>
        <Tab eventKey="SUV" title="SUV">
          <SlickCarouselComp type="suv" carsData={carsData} />
        </Tab>
        <Tab eventKey="MPV" title="MPV">
          <SlickCarouselComp type="mpv" carsData={carsData} />
        </Tab>
      </Tabs>
    </div>
  );
}
