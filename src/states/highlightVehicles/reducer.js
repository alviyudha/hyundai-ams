import { SET_HIGHLIGHT_VEHICLES } from "./action";

const initialState = {
  title1: "",
  text1: "",
  title2: "",
  text2: "",
  title3: "",
  text3: "",
  title4: "",
  text4: "",
  title5: "",
  text5: "",
};

const highlightVehiclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HIGHLIGHT_VEHICLES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default highlightVehiclesReducer;
