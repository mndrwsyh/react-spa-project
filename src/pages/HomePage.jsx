import Header from "../components/Header";
import { Grid, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import PetsIcon from "@mui/icons-material/Pets";

const HomePage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;
  return (
    <>
      {/* <Header />
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid gap={5} size={{ sm: 12, md: 6, lg: 6 }}>
          this is home page
        </Grid>
        <Grid gap={5} size={{ sm: 12, md: 6, lg: 6 }}>
          picture
        </Grid>
      </Grid> */}
      {/* using mui components, i want the layout to have a picture on the right side, and on the bottom left side (not too bottom) there is a text and two buttons  */}
      {/* <Box sx={{ backgroundColor: "lightpink", position: "relative" }}> */}
      <Header />
      {/* <PetsIcon
          sx={{
            color: "white",
            opacity: "50%",
            fontSize: "100px",
            position: "absolute",
            top: "80px",
            left: "40px",
            transform: "rotate(335deg)",
          }}
        /> */}
      <Grid container rowSpacing={3} columnSpacing={{ sm: 1, sm: 2, md: 2 }}>
        <Grid gap={5} size={{ sm: 12, md: 5, lg: 5 }}>
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
              Experience the ultimate relaxation and rejuvenation with our
              professional spa and salon services.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  borderRadius: "30px",
                  padding: "10px 30px",
                  backgroundColor: "deeppink",
                }}
                component={Link}
                to="/services"
              >
                View Services
              </Button>
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  borderRadius: "30px",
                  padding: "10px 30px",
                  // backgroundColor: "white",
                }}
                component={Link}
                to={currentuser ? "/bookings" : "/signup"}
              >
                Book Now
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid gap={5} size={{ sm: 12, md: 7, lg: 7 }}>
          <img
            src="/images/catdog.png"
            alt="pet_picture"
            style={{
              width: "100%",
              height: "90.1vh",
              // marginTop: "38px",
            }}
          />
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

export default HomePage;
