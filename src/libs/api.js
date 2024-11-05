import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const getAPI = async (resource, params = {}) => {
  try {
    const response = await axiosInstance.get(resource, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteAPI = async (resource, id) => {
  try {
    const response = await axiosInstance.delete(`${resource}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const updateAPI = async (resource, id, data) => {
  try {
    const response = await axiosInstance.patch(`${resource}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const postAPI = async (resource, data, headers = {}) => {
  try {
    const response = await axiosInstance.post(resource, data, { headers });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
