import Header from "../components/Header";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { signup } from "../utilities/api_users";
import { useState } from "react";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import validator from "email-validator";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleSignup = async (res) => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !name.trim() ||
      !password.trim()
    ) {
      toast.error("Please fill up all fields.");
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
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header />
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid gap={5} size={{ sm: 12, md: 5, lg: 5 }}>
          <img
            src="/images/signup_picture.png"
            alt="pet_picture"
            style={{
              width: "100%",
              height: "90.1vh",
            }}
          />
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
                  slotProps={{ htmlInput: { maxLength: 40 } }}
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
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  type="password"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  type="password"
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm Password"
                  fullWidth
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <Button
                  sx={{ backgroundColor: "#ab8d73", borderRadius: "30px" }}
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
                    color: "#ab8d73",
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
