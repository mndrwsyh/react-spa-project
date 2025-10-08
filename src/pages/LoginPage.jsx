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
import { login } from "../utilities/api_users";
import { useState } from "react";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import validator from "email-validator";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "../utilities/api_image";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill up all the fields.");
    } else if (!validator.validate(email)) {
      // 2. make sure the email is valid
      toast.error("Please use a valid email address.");
    } else {
      try {
        const loginData = await login(email, password);
        console.log(loginData);
        // set cookies
        setCookie("currentuser", loginData, {
          maxAge: 60 * 60 * 8, // expires in 8 hours
        });
        toast.success("Successfully logged in!");
        navigate("/");
      } catch (error) {
        toast.error("Invalid Email or Password.");
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
              paddingTop: "160px",
              paddingX: "80px",
              borderTopLeftRadius: "40px",
              borderBottomLeftRadius: "40px",
              display: "flex",
              height: "68.5vh",
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
                Login to Your Account
              </Typography>
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
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <Button
                  sx={{ backgroundColor: "deeppink", borderRadius: "30px" }}
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
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
                Dont have an account?
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: "none",
                    fontWeight: "300",
                    color: "deeppink",
                    marginLeft: 1,
                  }}
                  component={Link}
                  to="/signup"
                >
                  Create account
                </Typography>
              </Typography>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
