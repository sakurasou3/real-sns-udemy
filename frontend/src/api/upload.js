import axios from "axios";

export const upload = async (file) => {
  const data = new FormData();
  const fileName = `${Date.now()}${file.name}`;
  data.append("name", fileName);
  data.append("file", file);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE}/upload`,
      data
    );
    return response.data;
  } catch (e) {
    return {};
  }
};
