import { SET_CONTACT_DEALERS } from "./action";

const initialState = {
  dealers: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT_DEALERS:
      return {
        ...state,
        dealers: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
