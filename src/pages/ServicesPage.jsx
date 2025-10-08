import Header from "../components/Header";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../utilities/api_services";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../utilities/constants";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const ServicesPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies; // assign empty object to avoid error
  const { token = "" } = currentuser;
  const [services, setServices] = useState([]);
  // const [label, setLabel] = useState("");

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleServiceDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "hsla(0, 100%, 65%, 1.00)",
      confirmButtonText: "Yes, delete it.",
    }).then(async (result) => {
      // once user delete, then we get the product
      if (result.isConfirmed) {
        // delete product via api
        await deleteService(id);
        // delete product from the state
        // method 1
        // delete manually from the state
        // setProducts(products.filter((p) => p._id !== id));

        // method 2
        // get new data from backend
        const updatedServices = await getServices();
        setServices(updatedServices);
        toast.success("Service has been deleted.");
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
                  color: "deeppink",
                  borderColor: "deeppink",
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
              }}
              color="warning"
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{ backgroundColor: "white", paddingRight: "10px" }}
              >
                Sort By
              </InputLabel>
              <Select
                sx={{ borderRadius: "30px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //   value={category}
                label="Sort"
                //   onChange={(event) => {
                //     setCategory(event.target.value);
                //     // reset the page back to one
                //     setPage(1);
                //   }}
              >
                <MenuItem value="None">No sorting</MenuItem>
                <MenuItem value="Price">Sort by Price</MenuItem>
                <MenuItem value="Duration">Sory by Duration</MenuItem>
                {/* {categories.map((c) => (
                <MenuItem value={c._id}>{c.label}</MenuItem>
              ))} */}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "100%", paddingTop: 3 }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {services.length === 0 ? (
              <Typography variant="h5" align="center" py={3}>
                No services added yet.
              </Typography>
            ) : (
              <>
                {services.map((service) => (
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
                              color: "green",
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
                              color: "red",
                              minHeight: "40px",
                              minWidth: "35px",
                              borderRadius: "100%",
                              top: "7px",
                              right: "5px",
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
                            variant="outlined"
                            sx={{
                              borderColor: "deeppink",
                              color: "deeppink",
                            }}
                            label={`$${service.price}`}
                          />
                          <Chip
                            variant="outlined"
                            color="warning"
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
};

export default ServicesPage;
