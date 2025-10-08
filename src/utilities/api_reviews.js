import axios from "axios";
import { API_URL } from "./constants";

export async function getReviews() {
  const response = await axios.get(API_URL + "reviews");
  return response.data;
}
export async function getReview(id) {
  const response = await axios.get(API_URL + "reviews/" + id);
  //GET http:///sjdksjvnkjsblablabla
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

// export async function updateReview(
//   id,
//   name,
//   price,
//   duration,
//   description,
//   image
// ) {
//   const response = await axios.put(API_URL + "Reviews/" + id, {
//     name,
//     price,
//     duration,
//     description,
//     image,
//   });
//   return response.data;
// }

export async function deleteReview(id) {
  const response = await axios.delete(API_URL + "reviews/" + id);
  return response.data;
}
