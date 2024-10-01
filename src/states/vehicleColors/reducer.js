import { SET_COLORS_DATA, SET_CURRENT_COLOR } from "./action";

const initialState = {
  colorsData: [],
  currentImage: "",
  currentBackgroundColor: "",
  currentDescColor: "",
};

const vehicleColorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLORS_DATA:
      return {
        ...state,
        colorsData: action.payload,
      };
    case SET_CURRENT_COLOR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default vehicleColorsReducer;
