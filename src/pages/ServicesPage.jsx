import Header from "../components/Header";
import { getServices, deleteService } from "../utilities/api_services";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../utilities/constants";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

export default function ServicesPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [services, setServices] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    getServices(sortBy, token)
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortBy, token]);

  const handleServiceDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e57b7bff",
      cancelButtonColor: "#e0b793ff",
      confirmButtonText: "Yes, delete it.",
    }).then(async (result) => {
      // once user delete, then we get the service
      try {
        if (result.isConfirmed) {
          // delete service via api
          await deleteService(id, token);
          // get new data from backend
          const updatedServices = await getServices(sortBy, token);
          setServices(updatedServices);
          toast.success("Service has been deleted.");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    });
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="h4" fontWeight={"600"}>
            Our Services
          </Typography>
          <Box display={"flex"} gap={2}>
            {currentuser.role === "admin" && (
              <Button
                component={Link}
                to="/services/new"
                size="small"
                variant="outlined"
                sx={{
                  margin: "1px",
                  backgroundColor: "white",
                  color: "#392f26",
                  borderColor: "#392f26",
                  borderRadius: "30px",
                  paddingX: "20px",
                }}
              >
                Add New
              </Button>
            )}
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
                value={sortBy}
                label="Sort"
                onChange={(event) => {
                  setSortBy(event.target.value);
                }}
              >
                <MenuItem value="none">No sorting</MenuItem>
                <MenuItem value="price">Sort by Price</MenuItem>
                <MenuItem value="duration">Sory by Duration</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "100%", paddingTop: 3 }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          >
            {services.length === 0 ? (
              <Typography variant="h5" align="center" py={3}>
                No services added yet.
              </Typography>
            ) : (
              <>
                {services.map((service, i) => (
                  <Grid
                    key={service._id}
                    gap={5}
                    size={{ sm: 12, md: 6, lg: 3 }}
                  >
                    <Card
                      sx={{
                        padding: 1,
                        paddingBottom: 0,
                        borderRadius: "20px",
                        minHeight: "400px",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        // use index to alternate between colors of the service
                        backgroundColor: i % 2 === 0 ? "#f1dcc9" : "#ab8d73",
                        color: i % 2 === 0 ? "black" : "white",
                      }}
                    >
                      <CardMedia
                        sx={{ borderRadius: "20px" }}
                        component="img"
                        height="200"
                        image={
                          API_URL +
                          (service.image
                            ? service.image
                            : "uploads/default_pic.png")
                        }
                      />

                      {currentuser.role === "admin" && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0,
                            mt: "auto",
                          }}
                        >
                          <Button
                            component={Link}
                            to={`/services/${service._id}/edit`}
                            sx={{
                              position: "absolute",
                              color: "#90c991ff",
                              minHeight: "40px",
                              minWidth: "35px",
                              borderRadius: "100%",
                              top: "7px",
                              right: "40px",
                            }}
                          >
                            <EditIcon />
                          </Button>

                          <Button
                            sx={{
                              position: "absolute",
                              color: "#e57b7bff",
                              minHeight: "40px",
                              minWidth: "35px",
                              borderRadius: "100%",
                              top: "7px",
                              right: "7px",
                            }}
                            onClick={() => {
                              handleServiceDelete(service._id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      )}
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: "500",
                              fontSize: 21,
                            }}
                          >
                            {service.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "400",
                              fontSize: 18,
                              mb: 2,
                            }}
                          >
                            {service.description}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0,
                            mt: "auto",
                          }}
                        >
                          <Chip
                            variant="contained"
                            sx={{
                              backgroundColor: "#392f26",
                              color: "#f1dcc9",
                            }}
                            label={`$${service.price}`}
                          />
                          <Chip
                            variant="contained"
                            sx={{
                              backgroundColor: "#392f26",
                              color: "#f1dcc9",
                            }}
                            label={`${service.duration} Hours`}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
