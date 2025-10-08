import axios from "axios";
import { API_URL } from "./constants";

export const getAppointments = async (token) => {
  const response = await axios.get(API_URL + "appointments", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const addAppointment = async (
  customerName,
  customerEmail,
  service,
  petName,
  petBreed,
  date
) => {
  const response = await axios.post(API_URL + "appointments", {
    customerName: customerName,
    customerEmail: customerEmail,
    service: service,
    petName: petName,
    petBreed: petBreed,
    date: date,
  });

  return response.data;
};

export const updateAppointment = async (id, status, token) => {
  const response = await axios.put(
    API_URL + "appointments/" + id,
    {
      status: status,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const deleteAppointment = async (id, token) => {
  const response = await axios.delete(API_URL + "appointments/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
