import axios from "axios";
import { API_URL } from "./constants";

export async function getServices() {
  const response = await axios.get(API_URL + "services");
  return response.data;
}
export async function getService(id) {
  const response = await axios.get(API_URL + "services/" + id);
  //GET http:///sjdksjvnkjsblablabla
  return response.data;
}

export async function addService(name, price, duration, description, image) {
  const response = await axios.post(API_URL + "services", {
    name,
    price,
    duration,
    description,
    image,
  });
  return response.data;
}

export async function updateService(
  id,
  name,
  price,
  duration,
  description,
  image
) {
  const response = await axios.put(API_URL + "services/" + id, {
    name,
    price,
    duration,
    description,
    image,
  });
  return response.data;
}
export async function deleteService(id) {
  const response = await axios.delete(API_URL + "services/" + id);
  return response.data;
}
