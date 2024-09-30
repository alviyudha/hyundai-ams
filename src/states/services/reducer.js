// states/services/reducer.js

import {
    FETCH_DEALERS_REQUEST,
    FETCH_DEALERS_SUCCESS,
    FETCH_DEALERS_FAILURE,
  } from './action';
  
  const initialState = {
    loading: false,
    dealers: [],
    error: null,
  };
  
  const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DEALERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_DEALERS_SUCCESS:
        return {
          ...state,
          loading: false,
          dealers: action.payload,
          error: null,
        };
      case FETCH_DEALERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default servicesReducer;
  