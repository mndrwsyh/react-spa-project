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
  MenuItem,
} from "@mui/material";
import Doodles from "../components/Doodles";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAppointments, addAppointment } from "../utilities/api_appointments";
import { getServices } from "../utilities/api_services";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BookingPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;
  const { token = "" } = currentuser;

  const navigate = useNavigate();
  const [name, setName] = useState(currentuser.name);
  const [email, setEmail] = useState(currentuser.email);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [service, setService] = useState("");

  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // 1. check for error
    if (
      !name ||
      !email ||
      !service ||
      !petName ||
      !petBreed ||
      !selectedDateTime
    ) {
      toast.error("Please fill up all fields.");
    }

    try {
      // 2. trigger the api to create new product
      const appointments = await addAppointment(
        name,
        email,
        service,
        petName,
        petBreed,
        selectedDateTime,
        token
      );

      // 3. if successfull, redirect user back to homepage and show success message
      navigate("/appointments");
      console.log(appointments);
      toast.success("Appointment has been booked!");
    } catch (error) {
      toast.error(error.response.data.message);
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
          position: "relative",
        }}
      >
        <Doodles />
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            Book An Appointment
          </Typography>
          <Paper
            elevation={3}
            sx={{ marginTop: "50px", padding: 7, borderRadius: "40px" }}
          >
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
                InputProps={{
                  style: {
                    borderRadius: "30px",
                  },
                }}
                value={name}
                label="Name"
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
              <FormControl
                sx={{
                  minWidth: "250px",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  width: "100%",
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
                  sx={{ backgroundColor: "white", paddingRight: "10px" }}
                >
                  Service
                </InputLabel>
                <Select
                  sx={{ borderRadius: "30px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={service}
                  label="service"
                  onChange={(event) => {
                    setService(event.target.value);
                  }}
                >
                  {services.map((s) => (
                    <MenuItem value={s._id}>{s.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                InputProps={{
                  style: {
                    borderRadius: "30px",
                  },
                }}
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                label="Pet Name"
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
                InputProps={{
                  style: {
                    borderRadius: "30px",
                  },
                }}
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                label="Pet Breed"
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["StaticDateTimePicker"]}>
                  <DateTimePicker
                    label="Date/Time"
                    skipDisabled
                    disablePast
                    format="hh:mma MMMM D, YYYY"
                    timeSteps={{ minutes: 60 }}
                    minTime={dayjs(selectedDateTime).hour(9).minute(0)}
                    maxTime={dayjs(selectedDateTime).hour(18).minute(0)}
                    minDate={dayjs().set("day", 1)}
                    maxDate={dayjs().set("day", 30)}
                    value={selectedDateTime}
                    onChange={(newDateTime) => {
                      setSelectedDateTime(newDateTime);
                    }}
                    slotProps={{
                      textField: {
                        inputProps: {
                          readOnly: true, // Prevent typing
                        },
                        // This prevents opening the keyboard editing when users press any key
                        onKeyDown: (e) => e.preventDefault(),
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ backgroundColor: "#ab8d73", borderRadius: "30px" }}
                fullWidth
                variant="contained"
                onClick={handleFormSubmit}
              >
                Book
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
