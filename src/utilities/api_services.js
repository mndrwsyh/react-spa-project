import axios from "axios";
import { API_URL } from "./constants";

export async function getServices(sortBy) {
  const response = await axios.get(
    API_URL +
      "services" +
      (sortBy === "none" ? "" : sortBy === "price" ? "?price=1" : "?duration=1")
  );
  return response.data;
}

export async function getService(id) {
  const response = await axios.get(API_URL + "services/" + id);
  return response.data;
}

export async function addService(
  name,
  price,
  duration,
  description,
  image,
  token
) {
  const response = await axios.post(
    API_URL + "services",
    {
      name,
      price,
      duration,
      description,
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

export async function updateService(
  id,
  name,
  price,
  duration,
  description,
  image,
  token
) {
  const response = await axios.put(
    API_URL + "services/" + id,
    {
      name,
      price,
      duration,
      description,
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
export async function deleteService(id, token) {
  const response = await axios.delete(API_URL + "services/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
