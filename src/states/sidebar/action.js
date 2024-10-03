import api from "../../utils/api";

// Action Types
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const fetchUserProfile = () => async (dispatch) => {
  try {
    const storedUser = localStorage.getItem("userProfile");

    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    } else {
      const data = await api.getOwnProfile();
      dispatch(setUser(data));
      localStorage.setItem("userProfile", JSON.stringify(data));
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      dispatch(clearUser());
      localStorage.removeItem("userProfile");
    }
    // Tambahkan penanganan error lain sesuai kebutuhan
  }
};


