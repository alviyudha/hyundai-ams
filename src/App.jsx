import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./frontend/pages/Home";
import ErrorPage from "./frontend/pages/ErrorPage";
import VehicleList from "./admin/pages/vehicles/VehicleList";
import AddVehicle from "./admin/pages/vehicles/AddVehicles";
import EditVehicles from "./admin/pages/vehicles/EditVehicles";
import ColorList from "./admin/pages/colors/ColorList";
import AddColors from "./admin/pages/colors/AddColors";
import EditColors from "./admin/pages/colors/EditColors";
import ImgSlideList from "./admin/pages/Image-slide/ImgSlideList";
import EditImgSlide from "./admin/pages/Image-slide/EditImgSlide";
import AddImgSlide from "./admin/pages/Image-slide/AddImgSlide";
import SpecificationsList from "./admin/pages/specifications/SpecificationsList";
import AddSpecifications from "./admin/pages/specifications/AddSpecifications";
import EditSpecifications from "./admin/pages/specifications/EditSpecifications";
import DealerList from "./admin/pages/dealer/DealerList";
import AddDealer from "./admin/pages/dealer/AddDealer";
import EditDealer from "./admin/pages/dealer/EditDealer";
import ModelsPage from "./frontend/pages/ModelsPage";
import LayoutFE from "../LayoutFE";
import Contact from "./frontend/pages/Contact";
import Services from "./frontend/pages/Services";
import TestDrive from "./frontend/pages/TestDrive";
import ModelDetails from "./frontend/pages/ModelDetails";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TrimsList from "./admin/pages/trims/TrimsList";
import AddTrims from "./admin/pages/trims/AddTrims";
import EditTrims from "./admin/pages/trims/EditTrims";
import LayoutAdmin from "../LayoutAdmin";
import LoginPage from "./admin/pages/login/LoginPage";
import DashboardPage from "./admin/pages/dashboard/DashboardPage";
import UnderMaintenance from "./frontend/components/Undermaintance";
import { useDispatch, useSelector } from "react-redux";
import api from "./utils/api";
import { setAuthUserActionCreator } from "./states/login/action";
import CookieConsentComp from "./frontend/components/CookieConsent";
import PrivacyPolicy from "./frontend/pages/PrivacyPolicy";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  useEffect(() => {
    const isOnAdminRoute = window.location.pathname.startsWith("/admin-hyundai");
    const token = localStorage.getItem("accessToken");

    if (isOnAdminRoute && token) {
      api.putAccessToken(token);
      api
        .getOwnProfile()
        .then((user) => {
          dispatch(setAuthUserActionCreator(user));
          setLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data.msg === "jwt expired") {
            localStorage.removeItem("accessToken");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <CookieConsentComp />
    <Router>
      <div>
        {/* Frontend Routes */}
        <Routes>
          <Route element={<LayoutFE />}>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/models/:id" element={<ModelDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/test-drive" element={<TestDrive />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/maintenance" element={<UnderMaintenance />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin-hyundai"
            element={
              authUser ? (
                <Navigate to="/admin-hyundai/dashboard" />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route element={<LayoutAdmin authUser={authUser} />}>
            {authUser ? (
              <>
                <Route
                  path="/admin-hyundai/dashboard"
                  element={<DashboardPage />}
                />
                <Route
                  path="/admin-hyundai/vehicles"
                  element={<VehicleList />}
                />
                <Route
                  path="/admin-hyundai/vehicles/add"
                  element={<AddVehicle />}
                />
                <Route
                  path="/admin-hyundai/vehicles/edit/:id"
                  element={<EditVehicles />}
                />
                <Route
                  path="/admin-hyundai/colors"
                  element={<ColorList />}
                />
                <Route
                  path="/admin-hyundai/colors/add"
                  element={<AddColors />}
                />
                <Route
                  path="/admin-hyundai/colors/edit/:id"
                  element={<EditColors />}
                />
                <Route
                  path="/admin-hyundai/image-slide"
                  element={<ImgSlideList />}
                />
                <Route
                  path="/admin-hyundai/image-slide/add"
                  element={<AddImgSlide />}
                />
                <Route
                  path="/admin-hyundai/image-slide/edit/:id"
                  element={<EditImgSlide />}
                />
                <Route
                  path="/admin-hyundai/specifications"
                  element={<SpecificationsList />}
                />
                <Route
                  path="/admin-hyundai/specifications/add"
                  element={<AddSpecifications />}
                />
                <Route
                  path="/admin-hyundai/specifications/edit/:id"
                  element={<EditSpecifications />}
                />
                <Route
                  path="/admin-hyundai/dealers"
                  element={<DealerList />}
                />
                <Route
                  path="/admin-hyundai/dealers/add"
                  element={<AddDealer />}
                />
                <Route
                  path="/admin-hyundai/dealers/edit/:id"
                  element={<EditDealer />}
                />
                <Route path="/admin-hyundai/trims" element={<TrimsList />} />
                <Route
                  path="/admin-hyundai/trims/add"
                  element={<AddTrims />}
                />
                <Route
                  path="/admin-hyundai/trims/edit/:id"
                  element={<EditTrims />}
                />
              </>
            ) : (
              <Route
                path="/admin-hyundai/*"
                element={<Navigate to="/admin-hyundai" />}
              />
            )}
          </Route>
        </Routes>
      </div>
    </Router>
  </>
  );
}

export default App;
