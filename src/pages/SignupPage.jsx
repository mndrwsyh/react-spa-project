import Header from "../components/Header";
import {
  Card,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  Container,
  Paper,
} from "@mui/material";
import { API_URL } from "../utilities/constants";
import { signup } from "../utilities/api_users";
import { useState } from "react";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import validator from "email-validator";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { uploadImage } from "../utilities/api_image";
import { Link } from "react-router-dom";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

export default function SignupPage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill up all the fields.");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address.");
    } else if (password !== confirmPassword) {
      toast.error("Password does not match.");
    } else {
      try {
        const signUpData = await signup(name, email, password);
        // console.log(signUpData);
        // set cookies
        setCookie("currentuser", signUpData, {
          maxAge: 60 * 60 * 8, // expires in 8 hours
        });
        toast.success("Successfully created a new account!");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("jj");
      }
    }
  };

  return (
    <>
      <Header />
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid gap={5} size={{ sm: 12, md: 5, lg: 5 }}>
          insert text here
        </Grid>
        <Grid gap={5} size={{ sm: 12, md: 7, lg: 7 }}>
          <Paper
            elevation={3}
            sx={{
              padding: "93px",
              borderTopLeftRadius: "40px",
              borderBottomLeftRadius: "40px",
              display: "flex",
              height: "64.8vh",
            }}
          >
            <Container maxWidth="md">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "center",
                  mb: 5,
                }}
              >
                Create a New Account
              </Typography>
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
              <Box mb={2}>
                <TextField
                  sx={{ outlineColor: "deeppink" }}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  fullWidth
                />
              </Box>
              {/* <Box mb={2} display={"flex"} gap={2}>
                <TextField
                  color="warning"
                  type="number"
                  inputProps={{
                    min: 0,
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  // value={price}
                  // onChange={(e) => setPrice(e.target.value)}
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
                  // value={duration}
                  // onChange={(e) => setDuration(e.target.value)}
                  label="Duration"
                  fullWidth
                />
              </Box> */}
              <Box mb={2}>
                <TextField
                  type="password"
                  sx={{ outlineColor: "deeppink" }}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  type="password"
                  sx={{ outlineColor: "deeppink" }}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                    },
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm Password"
                  fullWidth
                />
              </Box>
              {/* <Box
                mb={2}
                sx={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                {image ? (
                  <>
                    <img
                      src={API_URL + image}
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        border: "1px solid orange",
                      }}
                    />
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
                    startIcon={<AccountCircleIcon />}
                  >
                    Upload Profile Picture
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
              </Box> */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <Button
                  sx={{ backgroundColor: "deeppink", borderRadius: "30px" }}
                  fullWidth
                  variant="contained"
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "300",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Already have an account?
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: "none",
                    fontWeight: "300",
                    color: "deeppink",
                    marginLeft: 1,
                  }}
                  component={Link}
                  to="/login"
                >
                  Sign in
                </Typography>
              </Typography>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

// export default SignupPage;
