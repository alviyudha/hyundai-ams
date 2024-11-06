import { getAPI } from "../../libs/api";

// Action Types
export const FETCH_DEALERS_REQUEST = "FETCH_DEALERS_REQUEST";
export const FETCH_DEALERS_SUCCESS = "FETCH_DEALERS_SUCCESS";
export const FETCH_DEALERS_FAILURE = "FETCH_DEALERS_FAILURE";

// Action Creators
export const fetchDealersRequest = () => ({
  type: FETCH_DEALERS_REQUEST,
});

export const fetchDealersSuccess = (dealers) => ({
  type: FETCH_DEALERS_SUCCESS,
  payload: dealers,
});

export const fetchDealersFailure = (error) => ({
  type: FETCH_DEALERS_FAILURE,
  payload: error,
});

// Thunk Function
export const fetchDealers = () => {
  return async (dispatch) => {
    dispatch(fetchDealersRequest());
    try {
      const data = await getAPI("dealer/");
      dispatch(fetchDealersSuccess(data));
    } catch (error) {
      dispatch(fetchDealersFailure(error.message));
    }
  };
};
