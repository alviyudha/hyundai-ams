import { SET_WARRANTY_IMAGE } from "./action";

const initialState = {
  warrantyImage: null,
};

const warrantyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WARRANTY_IMAGE:
      return {
        ...state,
        warrantyImage: action.payload,
      };
    default:
      return state;
  }
};

export default warrantyReducer;
