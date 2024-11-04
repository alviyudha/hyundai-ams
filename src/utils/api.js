// import axios from "axios";

// const api = (() => {
//   const BASE_URL = import.meta.env.VITE_APP_BASE_API;

//   function getAccessToken() {
//     return localStorage.getItem("accessToken");
//   }

//   async function _fetchWithAuth(url, options = {}) {
//     return axios({
//       url,
//       ...options,
//       headers: {
//         ...options.headers,
//         Authorization: `Bearer ${getAccessToken()}`,
//       },
//     });
//   }

//   function putAccessToken(token) {
//     localStorage.setItem("accessToken", token);
//   }

//   async function login({ username, password }) {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}login`,
//         {
//           username,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const { status, message, data } = response.data;

//       if (status !== "success") {
//         throw new Error(message);
//       }

//       const { token } = data;
//       putAccessToken(token);
//       return token;
//     } catch (error) {
//       const errorMessage = error.response?.data?.msg || error.message;
//       throw new Error(errorMessage);
//     }
//   }

//   async function getOwnProfile() {
//     const response = await _fetchWithAuth(`${BASE_URL}me`);
//     const { status, message, data } = response.data;

//     if (status !== "success") {
//       throw new Error(message);
//     }

//     return data.user; 
//   }

//   return {
//     putAccessToken,
//     getAccessToken,
//     login,
//     getOwnProfile,
//   };
// })();

// export default api;

const api = (() => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_API; 
  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
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
    const response = await fetch(`${BASE_URL}login`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    putAccessToken(token); // Simpan token setelah login
    return token; // Kembalikan token jika perlu
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}me`); // Tambahkan '/' di depan me

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }
 
  return {
    putAccessToken,
    getAccessToken,
    login,
    getOwnProfile,
  };
})();

export default api;
