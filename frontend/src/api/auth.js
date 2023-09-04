import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/auth/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (e) {
    return {};
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/auth/register`,
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (e) {
    return {};
  }
};
