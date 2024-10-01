import {
  FETCH_DEALERS_REQUEST,
  FETCH_DEALERS_SUCCESS,
  FETCH_DEALERS_FAILURE,
  FETCH_VEHICLES_REQUEST,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_FAILURE,
} from "./action";

const initialState = {
  dealers: [],
  vehicles: [],
  loadingDealers: false,
  loadingVehicles: false,
  error: null,
};

const testDriveReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEALERS_REQUEST:
      return { ...state, loadingDealers: true, error: null };
    case FETCH_DEALERS_SUCCESS:
      return { ...state, loadingDealers: false, dealers: action.payload };
    case FETCH_DEALERS_FAILURE:
      return { ...state, loadingDealers: false, error: action.payload };
    case FETCH_VEHICLES_REQUEST:
      return { ...state, loadingVehicles: true, error: null };
    case FETCH_VEHICLES_SUCCESS:
      return { ...state, loadingVehicles: false, vehicles: action.payload };
    case FETCH_VEHICLES_FAILURE:
      return { ...state, loadingVehicles: false, error: action.payload };
    default:
      return state;
  }
};

export default testDriveReducer;
