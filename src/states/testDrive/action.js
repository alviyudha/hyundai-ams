import { getAPI } from "../../libs/api";

// Action Types
export const FETCH_DEALERS_REQUEST = 'testDrive/FETCH_DEALERS_REQUEST';
export const FETCH_DEALERS_SUCCESS = 'testDrive/FETCH_DEALERS_SUCCESS';
export const FETCH_DEALERS_FAILURE = 'testDrive/FETCH_DEALERS_FAILURE';

export const FETCH_VEHICLES_REQUEST = 'testDrive/FETCH_VEHICLES_REQUEST';
export const FETCH_VEHICLES_SUCCESS = 'testDrive/FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_FAILURE = 'testDrive/FETCH_VEHICLES_FAILURE';

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

export const fetchVehiclesRequest = () => ({
  type: FETCH_VEHICLES_REQUEST,
});

export const fetchVehiclesSuccess = (vehicles) => ({
  type: FETCH_VEHICLES_SUCCESS,
  payload: vehicles,
});

export const fetchVehiclesFailure = (error) => ({
  type: FETCH_VEHICLES_FAILURE,
  payload: error,
});

// Thunk Functions
export const fetchDealers = () => async (dispatch) => {
  dispatch(fetchDealersRequest());
  try {
    const response = await getAPI('dealer');
    dispatch(fetchDealersSuccess(response));
  } catch (error) {
    dispatch(fetchDealersFailure(error.message));
  }
};

export const fetchVehicles = () => async (dispatch) => {
  dispatch(fetchVehiclesRequest());
  try {
    const response = await getAPI('vehicles');
    dispatch(fetchVehiclesSuccess(response));
  } catch (error) {
    dispatch(fetchVehiclesFailure(error.message));
  }
};
