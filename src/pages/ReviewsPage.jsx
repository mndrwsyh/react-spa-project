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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Doodles from "../components/Doodles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function ReviewsPage() {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [name, setName] = useState(currentuser.name);
  const [email, setEmail] = useState(currentuser.email);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [reviewRating, setReviewRating] = useState("All");

  useEffect(() => {
    getReviews(reviewRating, page, token)
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviewRating, page, token]);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error

    try {
      if (!name || !email || !rating || !reviewText || !reviewText.trim()) {
        toast.error("Please fill up all fields.");
      } else {
        // 2. trigger the api to create new review
        await addReview(name, email, rating, reviewText, token);

        // 3. clear the rating and input field, and set page back to default (1)
        setRating(0);
        setReviewText("");
        setPage(1);

        // 4 immedietely update the reviews displayed
        const updatedReviews = await getReviews(reviewRating, page);
        setReviews(updatedReviews);
        // 5. if successfull,  show success message
        toast.success("Review has been submitted!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  const handleServiceDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e57b7bff",
      cancelButtonColor: "#e0b793ff",
      confirmButtonText: "Yes, delete it.",
    }).then(async (result) => {
      // once user delete, then we get the review
      if (result.isConfirmed) {
        // delete review via api
        await deleteReview(id, token);
        // get new data from backend
        const updatedReviews = await getReviews(reviewRating, page);
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
          position: "relative",
        }}
      >
        <Doodles />
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              mb: 0,
            }}
          >
            Reviews
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 1,
              mt: 0,
            }}
          >
            <Box>
              <FormControl
                sx={{
                  minWidth: "250px",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ab8d73", // focused state
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ab8d73", // label color when focused
                  },
                }}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "#ab8d73",
                    backgroundColor: "white",
                  }}
                >
                  Sort By Rating
                </InputLabel>
                <Select
                  sx={{
                    borderRadius: "30px",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={reviewRating}
                  label="Sort"
                  onChange={(event) => {
                    setReviewRating(event.target.value);
                    // reset the page back to one
                    setPage(1);
                  }}
                >
                  <MenuItem value="All">All Stars</MenuItem>
                  <MenuItem value={1}>1 Star</MenuItem>
                  <MenuItem value={2}>2 Star</MenuItem>
                  <MenuItem value={3}>3 Star</MenuItem>
                  <MenuItem value={4}>4 Star</MenuItem>
                  <MenuItem value={5}>5 Star</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
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
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#ab8d73", // focused state
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#ab8d73", // label color when focused
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "30px",
                        },
                      }}
                      value={name}
                      label="Name"
                      fullWidth
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#ab8d73", // focused state
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#ab8d73", // label color when focused
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "30px",
                        },
                      }}
                      value={email}
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
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#ab8d73", // focused state
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#ab8d73", // label color when focused
                        },
                      }}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      slotProps={{ htmlInput: { maxLength: 80 } }}
                      label="Write your review"
                      fullWidth
                    />
                  </Box>
                  <Box mb={2}>
                    <Button
                      sx={{ backgroundColor: "#ab8d73", borderRadius: "30px" }}
                      fullWidth
                      variant="contained"
                      onClick={handleFormSubmit}
                      disabled={!token}
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
                        value={r.rating}
                        readOnly
                      />
                      <Typography>{r.customerName}</Typography>
                    </Box>
                    <Typography marginLeft={1} color="textSecondary">
                      {r.reviewText}
                    </Typography>

                    {(currentuser.role === "admin" ||
                      currentuser.email === r.customerEmail) && (
                      <>
                        <Button
                          sx={{
                            position: "absolute",
                            color: "#e57b7bff",
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
                      </>
                    )}
                  </Paper>
                </>
              ))}
              {reviews.length === 0 && (
                <Typography variant="h5" align="center" py={3}>
                  No more reviews.
                </Typography>
              )}
              <Box
                sx={{
                  pb: 2,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{ color: "#ab8d73" }}
                  disabled={page === 1} // the button will be disabled if at first page
                  onClick={() => setPage(page - 1)}
                >
                  <NavigateBeforeIcon />
                </Button>
                <span>Page: {page}</span>
                <Button
                  sx={{ color: "#ab8d73" }}
                  disabled={reviews.length === 0} // the button will be disabled if nomore reviews
                  onClick={() => setPage(page + 1)}
                >
                  <NavigateNextIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
