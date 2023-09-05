import axios from "axios";

export const getAllTimeLine = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/posts/timeline/${id}`
    );
    return response.data;
  } catch (_) {
    return [];
  }
};

export const getProfilePosts = async (id) => {
  if (!id) return [];
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE}/posts/profile/${id}`
    );
    return response.data;
  } catch (_) {
    return [];
  }
};

export const updateLike = async (id, userId) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_BASE}/posts/${id}/like`, {
      userId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (body) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/posts`,
      body
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
