import Header from "../components/Header";
import { useState, useEffect } from "react";
import { getReviews, addReview, deleteReview } from "../utilities/api_reviews";
import {
  Box,
  Typography,
  Container,
  Rating,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const ReviewsPage = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [name, setName] = useState(currentuser.name);
  const [email, setEmail] = useState(currentuser.email);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(token)
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !email || !rating || !reviewText) {
      toast.error("Please fill up the required fields.");
    }

    try {
      // 2. trigger the api to create new review
      await addReview(name, email, rating, reviewText, token);

      // 3. cl3ear the rating and input field
      setRating(0);
      setReviewText("");

      // 4 immedietely update the reviews displayed
      const updatedReviews = await getReviews(token);
      setReviews(updatedReviews);
      // 5. if successfull,  show success message
      toast.success("Review has been submitted!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleServiceDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "hsla(0, 100%, 65%, 1.00)",
      confirmButtonText: "Yes, delete it.",
    }).then(async (result) => {
      // once user delete, then we get the product
      if (result.isConfirmed) {
        // delete product via api
        await deleteReview(id);
        // delete product from the state
        // method 1
        // delete manually from the state
        // setProducts(products.filter((p) => p._id !== id));

        // method 2
        // get new data from backend
        const updatedReviews = await getReviews();
        setReviews(updatedReviews);
        toast.success("Review has been deleted.");
      }
    });
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          mx: 3,
          my: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          Reviews
        </Typography>
        <Container maxWidth="lg">
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ sm: 1, sm: 2, md: 2 }}
          >
            <Grid gap={5} size={{ sm: 12, md: 6, lg: 6 }}>
              <>
                <Paper
                  sx={{
                    borderRadius: "30px",
                    padding: 2.5,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    Add a Review
                  </Typography>
                  <Box mb={3} marginLeft={1}>
                    <Typography component="legend">Add your rating</Typography>
                    <Rating
                      name="controlled"
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      value={rating}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      sx={{ outlineColor: "deeppink" }}
                      InputProps={{
                        style: {
                          borderRadius: "30px",
                        },
                      }}
                      value={name}
                      // onChange={(e) => setName(e.target.value)}
                      label="Name"
                      fullWidth
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      sx={{ outlineColor: "deeppink" }}
                      InputProps={{
                        style: {
                          borderRadius: "30px",
                        },
                      }}
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      fullWidth
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      multiline
                      rows={3}
                      InputProps={{
                        style: {
                          borderRadius: "30px",
                        },
                      }}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      label="Write your review"
                      fullWidth
                    />
                  </Box>
                  <Box mb={2}>
                    <Button
                      sx={{ backgroundColor: "deeppink", borderRadius: "30px" }}
                      fullWidth
                      variant="contained"
                      onClick={handleFormSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                </Paper>
              </>
            </Grid>
            <Grid gap={5} size={{ sm: 12, md: 6, lg: 6 }}>
              {reviews.map((r) => (
                <>
                  <Paper
                    key={r._id}
                    sx={{
                      borderRadius: "30px",
                      padding: 2.5,
                      mb: 2,
                      position: "relative",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                      <Rating
                        name="simple-uncontrolled"
                        // onChange={(event, newValue) => {
                        //   console.log(newValue);
                        // }}
                        // defaultValue={2}
                        value={r.rating}
                        readOnly
                      />
                      <Typography>{r.customerName}</Typography>
                    </Box>
                    <Typography marginLeft={1} color="textSecondary">
                      {r.reviewText}
                    </Typography>

                    <Button
                      sx={{
                        position: "absolute",
                        color: "red",
                        minHeight: "40px",
                        minWidth: "35px",
                        borderRadius: "100%",
                        top: "13px",
                        right: "15px",
                      }}
                      onClick={() => {
                        handleServiceDelete(r._id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Paper>
                </>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ReviewsPage;
