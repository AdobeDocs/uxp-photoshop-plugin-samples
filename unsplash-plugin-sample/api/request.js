import { api } from "./api";

export const getPhotos = async (photoName) => {
  const res = await api.post("/", { photoName });
  console.log(res);
  return res.data;
};
