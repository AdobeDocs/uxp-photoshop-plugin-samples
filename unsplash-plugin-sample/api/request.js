import { api } from "./api";

export const getPhotos = async (pictureName) => {
  const res = await api.post("/", { pictureName });
  return res.data.message.results;
};
