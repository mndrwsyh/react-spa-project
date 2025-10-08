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

const AppointmentsPage = () => {
  const [value, setValue] = useState("upcoming");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [appointments, setAppointments] = useState([]);

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

  // call the api
  useEffect(() => {
    getAppointments(token)
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]); // call only once when the page load

  const handleCancelAppointment = (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel this appointment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f841acff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it.",
    }).then(async (result) => {
      // once user delete, then we get the product
      if (result.isConfirmed) {
        // delete product via api
        await deleteAppointment(id, token);
        // delete product from the state
        // method 1
        // delete manually from the state
        setAppointments(appointments.filter((a) => a._id !== id));

        // method 2
        // get new data from backend
        // const updatedOrder = await getOrders(category, page);
        // setProducts(updatedOrder);
        toast.success("Appointment has been canceled.");
      }
    });
  };

  const handleUpdateAppointment = async (id) => {
    try {
      // 2. trigger the api to create new product
      await updateAppointment(id, "completed", token);

      // 3. if successfull, redirect user back to homepage and show success message
      //   navigate("/appointments");
      const updatedAppointments = await getAppointments(token);
      setAppointments(updatedAppointments);
      toast.success("Appointment is complete.");
    } catch (error) {
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
        <Typography mb={3} variant="h4" fontWeight={"600"}>
          {currentuser.role === "admin"
            ? "All Appointments"
            : "My Appointments"}
        </Typography>

        <TabContext value={value}>
          <Box>
            <TabList
              sx={{
                "& .MuiTab-root": {
                  color: "gray", // unselected tab color
                },
                "& .Mui-selected": {
                  color: "deeppink !important", // selected tab text color
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "deeppink", // underline indicator color
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
                        Status
                      </TableCell>
                      {/* {appointments.length !== 0 ||
                        (appointments.filter((a) => a.status === "pending")
                          .length !== 0 && ( */}
                      <TableCell align="left"></TableCell>
                      {/* ))} */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.length === 0 ||
                    appointments.filter((a) => a.status === "pending")
                      .length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
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
                                    <Typography>{a.customerName}</Typography>
                                    <Typography>{a.customerEmail}</Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Typography>
                                      {/* {
                                        services.find(
                                          (s) => s._id === a.service
                                        ).name
                                      } */}
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
                                    {/* {o.status === "pending" &&
                        currentuser.role === "admin" && (
                          <Button
                            onClick={() => {
                              handleDeleteOrder(o._id);
                            }}
                            variant="outlined"
                            color="error"
                          >
                            Delete
                          </Button>
                        )} */}

                                    <Typography>
                                      {dayjs(a.date).format("dddd, DD/MM/YYYY")}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    {/* <Typography>
                                  {a.status.charAt(0).toUpperCase() +
                                    a.status.slice(1)}
                                </Typography> */}
                                    <Chip
                                      variant="contained"
                                      size="medium"
                                      color="warning"
                                      label={a.status.toUpperCase()}
                                    />
                                  </TableCell>
                                  <TableCell align="left">
                                    <Button
                                      sx={{
                                        borderRadius: "30px",
                                        marginRight: 2,
                                      }}
                                      variant="outlined"
                                      color="error"
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
                                          }}
                                          variant="outlined"
                                          color="warning"
                                          //   onClick={async () => {
                                          //     await updateAppointment(
                                          //       a._id,
                                          //       "completed",
                                          //       token
                                          //     );

                                          //     toast.info(
                                          //       "Appointment has finished."
                                          //     );
                                          //   }}
                                          onClick={() => {
                                            handleUpdateAppointment(a._id);
                                          }}
                                        >
                                          Appointment Complete
                                        </Button>
                                      </>
                                    )}
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
              <TableContainer
              // sx={{ mt: 3 }}
              //   component={Paper}
              >
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
                        Status
                      </TableCell>
                      {/* <TableCell align="left"></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.length === 0 ||
                    appointments.filter((a) => a.status === "completed")
                      .length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography>
                            No completed/finished appointments.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      appointments.map(
                        (a) => (
                          <>
                            {/* make it so that only status of completed shows */}
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
                                    <Typography>{a.customerEmail}</Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Typography>
                                      {/* {
                                        services.find(
                                          (s) => s._id === a.service
                                        ).name
                                      } */}
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
                                    {/* {o.status === "pending" &&
                        currentuser.role === "admin" && (
                          <Button
                            onClick={() => {
                              handleDeleteOrder(o._id);
                            }}
                            variant="outlined"
                            color="error"
                          >
                            Delete
                          </Button>
                        )} */}

                                    <Typography>
                                      {dayjs(a.date).format("dddd, DD/MM/YYYY")}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    {/* <Typography>
                                  {a.status.charAt(0).toUpperCase() +
                                    a.status.slice(1)}
                                </Typography> */}
                                    <Chip
                                      variant="contained"
                                      size="medium"
                                      sx={{
                                        backgroundColor: "deeppink",
                                        color: "white",
                                      }}
                                      label={a.status.toUpperCase()}
                                    />
                                  </TableCell>
                                  {/* <TableCell align="left">
                                    <Button
                                      sx={{
                                        borderRadius: "30px",
                                        marginRight: 2,
                                      }}
                                      variant="outlined"
                                      color="error"
                                      onClick={() => {
                                        handleCancelAppointment(a._id);
                                      }}
                                    >
                                      Cancel Appointment
                                    </Button>
                                    {a.status === "completed" && (
                                      <>
                                        <Button
                                          sx={{
                                            marginRight: 2,
                                            borderRadius: "30px",
                                          }}
                                          variant="outlined"
                                          color="warning"
                                          onClick={async () => {
                                            await updateAppointment(
                                              a._id,
                                              "completed",
                                              token
                                            );

                                            toast.info(
                                              "Appointment has finished."
                                            );
                                          }}
                                        >
                                          Appointment Complete
                                        </Button>
                                      </>
                                    )}
                                  </TableCell> */}
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
        </TabContext>
      </Box>
    </>
  );
};

export default AppointmentsPage;
