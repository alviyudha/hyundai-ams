import {
  FETCH_MODELS_REQUEST,
  FETCH_MODELS_SUCCESS,
  FETCH_MODELS_FAILURE,
} from "./action";

const initialState = {
  models: [],
  loading: false,
  error: null,
};

const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODELS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MODELS_SUCCESS:
      return { ...state, loading: false, models: action.payload };
    case FETCH_MODELS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default modelsReducer;
