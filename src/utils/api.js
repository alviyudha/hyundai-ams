import axios from "axios";

const api = (() => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_API;

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function _fetchWithAuth(url, options = {}) {
    return axios({
      url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }

  async function login({ username, password }) {
    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { status, message, data } = response.data;

      if (status !== "success") {
        throw new Error(message);
      }

      const { token } = data;
      putAccessToken(token);
      return token;
    } catch (error) {
      const errorMessage = error.response?.data?.msg || error.message;
      throw new Error(errorMessage);
    }
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}me`);
    const { status, message, data } = response.data;

    if (status !== "success") {
      throw new Error(message);
    }

    return data.user; 
  }

  return {
    putAccessToken,
    getAccessToken,
    login,
    getOwnProfile,
  };
})();

export default api;
