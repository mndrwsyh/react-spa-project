import axios from "axios";
import { API_URL } from "./constants";

export async function getGalleries() {
  const response = await axios.get(API_URL + "gallery");
  return response.data;
}
export async function getGallery(id) {
  const response = await axios.get(API_URL + "gallery/" + id);
  return response.data;
}

export async function addGallery(image, token) {
  const response = await axios.post(
    API_URL + "gallery",
    {
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function deleteGallery(id, token) {
  const response = await axios.delete(API_URL + "gallery/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
