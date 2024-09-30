export const FETCH_MODELS_REQUEST = 'FETCH_MODELS_REQUEST';
export const FETCH_MODELS_SUCCESS = 'FETCH_MODELS_SUCCESS';
export const FETCH_MODELS_FAILURE = 'FETCH_MODELS_FAILURE';

export const fetchModelsRequest = () => ({
  type: FETCH_MODELS_REQUEST,
});

export const fetchModelsSuccess = (models) => ({
  type: FETCH_MODELS_SUCCESS,
  payload: models,
});

export const fetchModelsFailure = (error) => ({
  type: FETCH_MODELS_FAILURE,
  payload: error,
});
