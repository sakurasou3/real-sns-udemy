import axios from "axios";

export const getUser = async (id) => {
  try {
    const response =  await axios.get(`/users/${id}`);
    return response.data;
  } catch (_) {
    return [];
  }
};
