import axios from "axios";
import { API_URL } from "./constants";

export async function login(email, password) {
  const response = await axios.post(API_URL + "users/login", {
    email: email,
    password: password,
  });

  return response.data;
}
export async function signup(name, email, password) {
  const response = await axios.post(API_URL + "users/signup", {
    name: name,
    email: email,
    password: password,
  });

  return response.data;
}
