import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
} from "./action";

const initialState = {
  carsData: [],
  loading: false,
  error: null,
  activeKey: "Electrified",
};

const tabProdukReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        carsData: action.payload,
      };
    case FETCH_CARS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_ACTIVE_KEY":
      return {
        ...state,
        activeKey: action.payload,
      };
    default:
      return state;
  }
};

export default tabProdukReducer;
