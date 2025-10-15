import Header from "../components/Header";
import {
  Box,
  Typography,
  Card,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  FormControl,
  Chip,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import {
  getAppointments,
  deleteAppointment,
  updateAppointment,
} from "../utilities/api_appointments";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { getServices } from "../utilities/api_services";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function AppointmentsPage() {
  const [value, setValue] = useState("upcoming");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [appointments, setAppointments] = useState([]);

  const [services, setServices] = useState([]);
  const [service, setService] = useState("All");

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // call the api
  useEffect(() => {
    getAppointments(service, token)
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [service, token]); // call only once when the page load

  const handleCancelAppointment = (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e57b7bff",
      cancelButtonColor: "#e0b793ff",
      confirmButtonText: "Yes, cancel it.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // delete appointment via api
        await deleteAppointment(id, token);
        // delete appointment manually from the state
        setAppointments(appointments.filter((a) => a._id !== id));
        toast.success("Appointment has been canceled.");
      }
    });
  };

  const handleUpdateAppointment = async (id, date) => {
    const appointmentDate = dayjs(date);
    try {
      // if havent reached appointment time, it cannot be marked as complete
      if (dayjs().isBefore(appointmentDate)) {
        toast.error(
          "Appointments can only be marked as complete after the scheduled time."
        );
      } else {
        // 2. trigger the api to create new appointment
        await updateAppointment(id, "completed", date, token);

        // 3. if successful, get updated appointments show success message
        const updatedAppointments = await getAppointments(service, token);
        setAppointments(updatedAppointments);
        toast.success("Appointment is complete.");
      }
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
          mx: 5,
          my: 4,
        }}
      >
        {!token ? (
          <>
            <Typography color="error" mb={3} variant="h4" fontWeight={"600"}>
              You cannot access this page.
            </Typography>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography mb={3} variant="h4" fontWeight={"600"}>
                {currentuser.role === "admin"
                  ? "All Appointments"
                  : "My Appointments"}
              </Typography>
              <Box>
                <FormControl
                  sx={{
                    minWidth: "250px",
                    backgroundColor: "white",
                    borderRadius: "30px",
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
                    sx={{ color: "#ab8d73", backgroundColor: "white" }}
                  >
                    Sort By
                  </InputLabel>
                  <Select
                    sx={{ borderRadius: "30px" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={service}
                    label="Sort"
                    onChange={(event) => {
                      setService(event.target.value);
                    }}
                  >
                    <MenuItem value="All">All Services</MenuItem>
                    {services.map((s) => (
                      <MenuItem value={s._id}>{s.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <TabContext value={value}>
              <Box>
                <TabList
                  sx={{
                    "& .MuiTab-root": {
                      color: "gray", // unselected tab color
                    },
                    "& .Mui-selected": {
                      color: "#392f26 !important", // selected tab text color
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#392f26", // underline indicator color
                    },
                  }}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Upcoming Appointments"
                    value="upcoming"
                    sx={{ marginRight: 1 }}
                  />
                  <Tab label="History/Completed Appointments" value="history" />
                </TabList>
              </Box>
              <TabPanel sx={{ padding: "0px" }} value="upcoming">
                <Card
                  sx={{
                    p: "20px",
                  }}
                >
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: "gray" }}>Customer</TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Service
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Pet Name
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Pet Breed
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Date
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Time
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Status
                          </TableCell>
                          <TableCell align="left"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointments.length === 0 ||
                        appointments.filter((a) => a.status === "pending")
                          .length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} align="center">
                              <Typography>No upcoming appointments.</Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          appointments.map(
                            (a) => (
                              <>
                                {a.status === "pending" && (
                                  <>
                                    <TableRow
                                      key={a._id}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        <Typography>
                                          {a.customerName}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            color: "GrayText",
                                            fontSize: "15px",
                                          }}
                                        >
                                          {a.customerEmail}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography>
                                          {a.service && a.service.name}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography>{a.petName}</Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography>{a.petBreed}</Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography>
                                          {dayjs(a.date).format(
                                            "dddd, DD/MM/YYYY"
                                          )}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography>
                                          {dayjs(a.date).format("hh:mma")}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Chip
                                          variant="contained"
                                          size="medium"
                                          sx={{
                                            backgroundColor: "#f1dcc9",
                                            color: "#392f26",
                                          }}
                                          label={a.status.toUpperCase()}
                                        />
                                      </TableCell>
                                      <TableCell align="left">
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <Button
                                            sx={{
                                              borderRadius: "30px",
                                              marginRight: 2,
                                              color: "#392f26",
                                              border: "1px solid #392f26",
                                            }}
                                            variant="outlined"
                                            onClick={() => {
                                              handleCancelAppointment(a._id);
                                            }}
                                          >
                                            Cancel Appointment
                                          </Button>
                                          {currentuser.role === "admin" && (
                                            <>
                                              <Button
                                                sx={{
                                                  marginRight: 2,
                                                  borderRadius: "30px",
                                                  color: "#ab8d73",
                                                  border: "1px solid #ab8d73",
                                                }}
                                                variant="outlined"
                                                onClick={() => {
                                                  handleUpdateAppointment(
                                                    a._id,
                                                    a.date
                                                  );
                                                }}
                                              >
                                                Appointment Complete
                                              </Button>
                                            </>
                                          )}
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                )}
                              </>
                            )
                            //   )
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </TabPanel>
              <TabPanel sx={{ padding: "0px" }} value="history">
                <Card
                  sx={{
                    p: "20px",
                  }}
                >
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: "gray" }}>Customer</TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Service
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Pet Name
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Pet Breed
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Date
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Time
                          </TableCell>
                          <TableCell sx={{ color: "gray" }} align="left">
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointments.length === 0 ||
                        appointments.filter((a) => a.status === "completed")
                          .length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              <Typography>
                                No completed/finished appointments.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          appointments.map((a) => (
                            <>
                              {a.status === "completed" && (
                                <>
                                  <TableRow
                                    key={a._id}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      <Typography>{a.customerName}</Typography>
                                      <Typography
                                        sx={{
                                          color: "GrayText",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {a.customerEmail}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                      <Typography>
                                        {a.service && a.service.name}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                      <Typography>{a.petName}</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                      <Typography>{a.petBreed}</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                      <Typography>
                                        {dayjs(a.date).format(
                                          "dddd, DD/MM/YYYY"
                                        )}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                      <Typography>
                                        {dayjs(a.date).format("hh:mma")}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                      <Chip
                                        variant="contained"
                                        size="medium"
                                        sx={{
                                          backgroundColor: "#ab8d73",
                                          color: "white",
                                        }}
                                        label={a.status.toUpperCase()}
                                      />
                                    </TableCell>
                                  </TableRow>
                                </>
                              )}
                            </>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </TabPanel>
            </TabContext>
          </>
        )}
      </Box>
    </>
  );
}
