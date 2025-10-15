import Header from "../components/Header";
import { useState, useEffect } from "react";
import {
  getGalleries,
  addGallery,
  deleteGallery,
} from "../utilities/api_gallery";
import { Box, Typography, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { API_URL } from "../utilities/constants";
import { styled } from "@mui/material/styles";
import { uploadImage } from "../utilities/api_image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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

export default function GalleryPage() {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getGalleries(token)
      .then((data) => {
        setGallery(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleFormSubmit = async (event) => {
    try {
      // 2. trigger the api to add photo
      await addGallery(image, token);
      setImage(null);
      // 3. if successfull, get updated gallery and show success message
      toast.success("New photo has been added to the gallery!");
      const updatedGallery = await getGalleries(token);
      setGallery(updatedGallery);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePhotoDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this photo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e57b7bff",
      cancelButtonColor: "#e0b793ff",
      confirmButtonText: "Yes, delete it.",
    }).then(async (result) => {
      // once user delete, then we get the photo
      if (result.isConfirmed) {
        // delete product via api
        await deleteGallery(id, token);
        // get new data from backend
        const updatedGallery = await getGalleries();
        setGallery(updatedGallery);
        toast.success("Photo has been removed from gallery.");
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
          Photo Gallery
        </Typography>
        {currentuser.role === "admin" && (
          <>
            <Box
              mb={2}
              sx={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              {image ? (
                <>
                  <img src={API_URL + image} width="150px" />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: " 20px",
                      backgroundColor: "#f1dcc9",
                      color: "black",
                    }}
                    size="small"
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: " 20px", backgroundColor: "#ab8d73" }}
                    size="small"
                    onClick={handleFormSubmit}
                  >
                    Add Photo
                  </Button>
                </>
              ) : (
                <Button
                  sx={{ borderRadius: "20px", backgroundColor: "#ab8d73" }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  Add Photo
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
          </>
        )}
        <ImageList variant="masonry" cols={3} gap={8}>
          {gallery.map((g) => (
            <ImageListItem key={g._id}>
              <img src={API_URL + g.image} alt="gallery pics" />
              {currentuser.role === "admin" && (
                <Button
                  sx={{
                    position: "absolute",
                    color: "#e57b7bff",
                    backgroundColor: "white",
                    minHeight: "40px",
                    minWidth: "30px",
                    borderRadius: "100%",
                    top: "10px",
                    right: "10px",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    handlePhotoDelete(g._id);
                  }}
                >
                  <DeleteIcon />
                </Button>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
