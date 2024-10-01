export const FETCH_CARS_REQUEST = "FETCH_CARS_REQUEST";
export const FETCH_CARS_SUCCESS = "FETCH_CARS_SUCCESS";
export const FETCH_CARS_FAILURE = "FETCH_CARS_FAILURE";

export const fetchCarsRequest = () => ({
  type: FETCH_CARS_REQUEST,
});

export const fetchCarsSuccess = (carsData) => ({
  type: FETCH_CARS_SUCCESS,
  payload: carsData,
});

export const fetchCarsFailure = (error) => ({
  type: FETCH_CARS_FAILURE,
  payload: error,
});
