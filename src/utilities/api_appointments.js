import axios from "axios";
import { API_URL } from "./constants";

export const getAppointments = async (service, token) => {
  const response = await axios.get(
    API_URL + "appointments" + (service === "All" ? "" : "?service=" + service),
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const addAppointment = async (
  customerName,
  customerEmail,
  service,
  petName,
  petBreed,
  date,
  token
) => {
  const response = await axios.post(
    API_URL + "appointments",
    {
      customerName: customerName,
      customerEmail: customerEmail,
      service: service,
      petName: petName,
      petBreed: petBreed,
      date: date,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};

export const updateAppointment = async (id, status, date, token) => {
  const response = await axios.put(
    API_URL + "appointments/" + id,
    {
      status: status,
      date,
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
