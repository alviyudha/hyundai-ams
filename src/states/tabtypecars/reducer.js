import { SET_VEHICLES } from "./action";

const initialState = {
  vehicles: [],
};

const tabTypeCarsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };
    default:
      return state;
  }
};

export default tabTypeCarsReducer;
