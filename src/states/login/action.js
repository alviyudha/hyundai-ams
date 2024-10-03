// import api from "../../utils/api";



// export const LOGIN_REQUEST = "authUser/LOGIN_REQUEST";
// export const LOGIN_SUCCESS = "authUser/LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "authUser/LOGIN_FAILURE";
// export const LOGOUT = "authUser/LOGOUT";

// export const logout = () => ({
//   type: LOGOUT,
// });

// export const loginRequest = () => ({ type: LOGIN_REQUEST });
// export const loginSuccess = (token) => ({
//   type: LOGIN_SUCCESS,
//   payload: token,
// });
// export const loginFailure = (error) => ({
//   type: LOGIN_FAILURE,
//   payload: error,
// });

// export const login = (username, password) => {
//   return async (dispatch) => {
//     dispatch(loginRequest());
//     try {
//       const token = await api.login({ username, password });
//       api.putAccessToken(token);
//       localStorage.setItem("accessToken", token); // Simpan token di localStorage
//       dispatch(loginSuccess(token));
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//     }
//   };
// };


// export const clearAuth = () => (dispatch) => {
//   localStorage.removeItem("accessToken");
//   dispatch(logout());
// };




import api from "../../utils/api";
const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ username, password }) {
  return async (dispatch) => {
    try {
      const token = await api.login({ username, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}
function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
  };
}

export {
  ActionType,
  asyncSetAuthUser,
  setAuthUserActionCreator,
  asyncUnsetAuthUser,
  unsetAuthUserActionCreator,
};