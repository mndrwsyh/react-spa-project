import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { API_URL } from "../utilities/constants";
import SettingsIcon from "@mui/icons-material/Settings";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;

  const pages = ["Home", "Services", "Book Appointment", "Reviews", "Gallery"];

  const settings = currentuser
    ? [
        currentuser.role === "admin" ? "All Appointments" : "My Appointments",
        "Logout",
      ]
    : ["Login", "Sign Up"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              mb: "2px",
              color: "#ab8d73",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            C&D SPA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={Link}
                  to={
                    page === "Home"
                      ? "/"
                      : page === "Book Appointment"
                      ? currentuser
                        ? "/bookings"
                        : "/signup"
                      : `/${page.toLowerCase()}`
                  }
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PetsIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#ab8d73",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            C&D SPA
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              marginRight: 3,
            }}
          >
            {pages.map((page) => (
              <Button
                component={Link}
                to={
                  page === "Home"
                    ? "/"
                    : page === "Book Appointment"
                    ? currentuser
                      ? "/bookings"
                      : "/signup"
                    : `/${page.toLowerCase()}`
                }
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {currentuser ? (
                  <Avatar alt="Remy Sharp" />
                ) : (
                  // <CollectionsBookmarkIcon
                  //   sx={{ fontSize: "40px", color: "deeppink" }}
                  // />
                  <SettingsIcon sx={{ fontSize: "40px" }} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  component={Link}
                  to={
                    setting === "My Appointments"
                      ? "/appointments"
                      : setting === "All Appointments"
                      ? "/appointments"
                      : setting === "Sign Up"
                      ? "/signup"
                      : setting === "Logout"
                      ? "/"
                      : `/${setting.toLowerCase()}`
                  }
                  key={setting}
                  onClick={
                    setting === "Logout"
                      ? () => {
                          removeCookie("currentuser");
                          navigate("/");
                        }
                      : handleCloseNavMenu
                  }
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
