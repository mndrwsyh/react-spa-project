import Header from "../components/Header";
import { Grid, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import PetsIcon from "@mui/icons-material/Pets";

export default function HomePage() {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;
  return (
    <>
      <Header />
      <Grid container rowSpacing={3} columnSpacing={{ sm: 1, sm: 2, md: 2 }}>
        <Grid size={{ sm: 12, md: 5, lg: 5 }}>
          <Box
            minHeight={"70vh"}
            sx={{
              padding: 7,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "600", mb: 1 }}>
              Your Pet, Our Priority
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: "gray" }}>
              Treat your pets to a luxurious grooming experience where every
              wash, brush, and massage is done with gentle care and love.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  borderRadius: "30px",
                  padding: "10px 30px",
                  backgroundColor: "#392f26",
                }}
                component={Link}
                to="/services"
              >
                View Services
              </Button>
              <Button
                sx={{
                  borderRadius: "30px",
                  padding: "10px 30px",
                  color: "#392f26",
                  outline: "2px solid #392f26",
                }}
                component={Link}
                to={currentuser ? "/bookings" : "/signup"}
              >
                Book Now
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ sm: 12, md: 7, lg: 7 }}>
          <img
            src="/images/homepage_picture_2.png"
            alt="pet_picture"
            style={{
              width: "100%",
              height: "90.1vh",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
