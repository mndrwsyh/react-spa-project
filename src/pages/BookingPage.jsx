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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { toast } from "sonner";
import { addAppointment } from "../utilities/api_appointments";
import { getServices } from "../utilities/api_services";
import { API_URL } from "../utilities/constants";
import { uploadImage } from "../utilities/api_image";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

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

const BookingPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;

  const navigate = useNavigate();
  const [name, setName] = useState(currentuser.name);
  const [email, setEmail] = useState(currentuser.email);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [image, setImage] = useState(null);

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
        selectedDateTime
      );

      // 3. if successfull, redirect user back to homepage and show success message
      navigate("/appointments");
      console.log(appointments);
      toast.success("Appointment has been booked!");
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
                sx={{ outlineColor: "deeppink" }}
                InputProps={{
                  style: {
                    borderRadius: "30px",
                  },
                }}
                value={name}
                // onChange={(e) => setName(e.target.value)}
                label="Name"
                fullWidth
              />
              <TextField
                sx={{ outlineColor: "deeppink" }}
                InputProps={{
                  style: {
                    borderRadius: "30px",
                  },
                }}
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                label="Email"
                fullWidth
              />
            </Box>

            <Box mb={2}>
              <FormControl color="warning" sx={{ width: "100%" }}>
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
                sx={{ outlineColor: "deeppink" }}
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
                sx={{ outlineColor: "deeppink" }}
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
                <DemoContainer
                  slotProps={{
                    textField: {
                      sx: {
                        "& .MuiInputBase-root": {
                          borderRadius: "20px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "warning.main",
                        },
                      },
                    },
                  }}
                  components={["StaticDateTimePicker"]}
                >
                  <DateTimePicker
                    label="Date/Time"
                    skipDisabled
                    disablePast
                    format="hh:mma MMMM D, YYYY"
                    timeSteps={{ minutes: 30 }}
                    minTime={dayjs(selectedDateTime).hour(9).minute(0)}
                    maxTime={dayjs(selectedDateTime).hour(17).minute(30)}
                    // minDate={dayjs().set("day", 1)}
                    maxDate={dayjs().set("day", 30)}
                    value={selectedDateTime}
                    onChange={(newDateTime) => {
                      setSelectedDateTime(newDateTime);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ backgroundColor: "deeppink", borderRadius: "30px" }}
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
};

export default BookingPage;
