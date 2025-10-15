import axios from "axios";
import { API_URL } from "./constants";

export async function getReviews(rating, page = 1) {
  const response = await axios.get(
    API_URL +
      "reviews?page=" +
      page +
      (rating === "All" ? "" : "&rating=" + rating)
  );
  return response.data;
}
export async function getReview(id) {
  const response = await axios.get(API_URL + "reviews/" + id);
  return response.data;
}

export async function addReview(
  customerName,
  customerEmail,
  rating,
  reviewText,
  token
) {
  const response = await axios.post(
    API_URL + "reviews",
    {
      customerName,
      customerEmail,
      rating,
      reviewText,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function deleteReview(id, token) {
  const response = await axios.delete(API_URL + "reviews/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
