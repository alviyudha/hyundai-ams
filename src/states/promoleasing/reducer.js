import { SET_PROMO_LEASING_DATA } from "./action";

const initialState = {
  promoLeasingData: null,
};

const promoLeasingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROMO_LEASING_DATA:
      return {
        ...state,
        promoLeasingData: action.payload,
      };
    default:
      return state;
  }
};

export default promoLeasingReducer;
