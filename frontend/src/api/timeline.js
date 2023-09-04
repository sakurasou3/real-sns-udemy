import axios from "axios";

export const getAllTimeLine = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE}/posts/timeline/${id}`);
    return response.data;
  } catch (_) {
    return [];
  }
};

export const getProfilePosts = async (id) => {
  if (!id) return [];
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE}/posts/profile/${id}`);
    return response.data;
  } catch (_) {
    return [];
  }
};
