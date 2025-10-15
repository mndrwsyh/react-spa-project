import Header from "../components/Header";
import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { toast } from "sonner";
import { updateService } from "../utilities/api_services";
import { API_URL } from "../utilities/constants";
import { uploadImage } from "../utilities/api_image";
import { useNavigate, useParams } from "react-router-dom";
import { getService } from "../utilities/api_services";
import { Link } from "react-router-dom";
import Doodles from "../components/Doodles";
import { useCookies } from "react-cookie";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function ServicesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getService(id)
      .then((serviceData) => {
        // check if service data is empty or not
        if (serviceData) {
          // update state with service data
          setName(serviceData ? serviceData.name : "");
          setPrice(serviceData ? serviceData.price : 0);
          setDuration(serviceData ? serviceData.duration : 0);
          setDescription(serviceData ? serviceData.description : "");
          setImage(serviceData ? serviceData.image : null);
        } else {
          // if not available, set error message
          setError("Service not found");
        }
      })
      .catch((error) => {
        // catch the api error
        setError("Service not Found");
      });
  }, [id]);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !price || !duration || !description || !image) {
      toast.error("Please fill up all fields.");
    }

    try {
      // 2. trigger the api to update service
      await updateService(id, name, price, duration, description, image, token);

      // 3. if successfull, redirect user back to service page and show success message
      navigate("/services");
      toast.success("Service has been updated!");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (error) {
    return (
      <>
        <Header title="Welcome To My Store" />
        <Container sx={{ textAlign: "center" }} maxWidth="sm">
          <Typography variant="h3" align="center" mb={2} mt={2} color="error">
            {error}
          </Typography>
          <Button variant="contained" color="warning" component={Link} to="/">
            Go back to services page
          </Button>
        </Container>
      </>
    );
  }

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
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            Edit Service
          </Typography>
          <Paper
            elevation={3}
            sx={{ marginTop: "50px", padding: 4, borderRadius: "40px" }}
          >
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
                onChange={(e) => setName(e.target.value)}
                label="Name"
                fullWidth
              />
            </Box>
            <Box mb={2} display={"flex"} gap={2}>
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
                type="number"
                inputProps={{
                  min: 0,
                  style: {
                    borderRadius: "30px",
                  },
                }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                label="Price"
                fullWidth
              />
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
                type="number"
                inputProps={{
                  min: 0,
                  style: {
                    borderRadius: "30px",
                  },
                }}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                label="Duration"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                multiline
                rows={3}
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
                    borderRadius: "20px",
                  },
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                fullWidth
              />
            </Box>
            <Box
              mb={2}
              sx={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              {image ? (
                <>
                  <img src={API_URL + image} width="150px" />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: " 20px",
                      backgroundColor: "#392f26",
                      color: "#f1dcc9",
                    }}
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <Button
                  sx={{
                    borderRadius: " 20px",
                    backgroundColor: "#392f26",
                    color: "#f1dcc9",
                  }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="warning"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={async (event) => {
                      const data = await uploadImage(event.target.files[0]);
                      // {image_url : "uploads/image.jpg"}
                      // set image url into state
                      setImage(data.image_url);
                    }}
                    accept="image/*"
                  />
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ backgroundColor: "#ab8d73", borderRadius: "20px" }}
                fullWidth
                variant="contained"
                onClick={handleFormSubmit}
              >
                Update
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
