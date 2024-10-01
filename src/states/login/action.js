import api from "../../utils/api";

export const LOGIN_REQUEST = "authUser/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "authUser/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "authUser/LOGIN_FAILURE";
export const LOGOUT = "authUser/LOGOUT";

export const logout = () => ({
  type: LOGOUT,
});

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const token = await api.login({ username, password });
      api.putAccessToken(token);
      dispatch(loginSuccess(token));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const clearAuth = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  dispatch(logout());
};
