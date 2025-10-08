import Header from "../components/Header";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  Container,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { toast } from "sonner";
import { addService } from "../utilities/api_services";
import { API_URL } from "../utilities/constants";
import { uploadImage } from "../utilities/api_image";
import { useNavigate } from "react-router-dom";

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

const ServicesAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (!name || !price || !duration || !description) {
      toast.error("Please fill up the required fields.");
    }

    try {
      // 2. trigger the api to create new product
      await addService(name, price, duration, description, image);

      // 3. if successfull, redirect user back to homepage and show success message
      navigate("/services");
      toast.success("New service has been added!");
    } catch (error) {
      console.log(error.message);
    }
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
            Add a Service
          </Typography>
          <Paper
            elevation={3}
            sx={{ marginTop: "50px", padding: 4, borderRadius: "40px" }}
          >
            <Box mb={2}>
              <TextField
                sx={{ outlineColor: "deeppink" }}
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
                color="warning"
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
                color="warning"
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
                    color="warning"
                    variant="contained"
                    sx={{ borderRadius: " 20px" }}
                    size="small"
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <Button
                  sx={{ borderRadius: "20px" }}
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
                sx={{ backgroundColor: "deeppink", borderRadius: "30px" }}
                fullWidth
                variant="contained"
                onClick={handleFormSubmit}
              >
                Add
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ServicesAdd;
