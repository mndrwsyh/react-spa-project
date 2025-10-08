import Header from "../components/Header";
import { Box, Typography } from "@mui/material";

const GalleryPage = () => {
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
      </Box>
    </>
  );
};

export default GalleryPage;
