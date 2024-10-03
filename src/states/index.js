import { configureStore } from "@reduxjs/toolkit"
import imgSlideReducer from "./imgSlide/reducer";
import tabProdukReducer from "./tabProduct/reducer";
import modelsReducer from "./vehicles/reducer";
import promoLeasingReducer from "./promoleasing/reducer";
import warrantyReducer from "./warranty/reducer";
import highlightVehiclesReducer from "./highlightVehicles/reducer";
import tabTypeCarsReducer from "./tabtypecars/reducer";
import vehicleColorsReducer from "./vehicleColors/reducer";
import contactReducer from "./contact/reducer";
import servicesReducer from "./services/reducer";
import testDriveReducer from "./testDrive/reducer";
import authUserReducer from "./login/reducer";
import sidebarReducer from "./sidebar/reducer";

const store = configureStore({
    reducer: {
        imgSlide: imgSlideReducer,
        tabProduk: tabProdukReducer,
        models: modelsReducer,
        promoLeasing: promoLeasingReducer,
        warranty: warrantyReducer,
        Highlight: highlightVehiclesReducer,
        tabtypeCar: tabTypeCarsReducer,
        vehicleColor: vehicleColorsReducer,
        contact: contactReducer,
        service: servicesReducer,
        testDrive: testDriveReducer,
        authUser: authUserReducer,
        sidebar: sidebarReducer,
    },
  });
  
  export default store;