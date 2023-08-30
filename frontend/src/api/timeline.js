import axios from "axios";

export const getAllTimeLine = async () => {
  try {
    const response =  await axios.get("/posts/timeline/64df50c6cefda32195638a05");
    return response.data;
  } catch (_) {
    return [];
  }
};
