import axios from "axios";

export const getUser = async (id) => {
  try {
    const response =  await axios.get(`${process.env.REACT_APP_API_BASE}/users/${id}`);
    return response.data;
  } catch (_) {
    return [];
  }
};
