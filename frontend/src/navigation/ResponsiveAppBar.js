import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import QrCodeModal from "../common/QrCodeModal";
import ProviderContext from "../common/ProviderContext";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function ResponsiveAppBar({ toggleDrawer, open, logout }) {
//   const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const { currProvider } = useContext(ProviderContext);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

  const handleCloseUserMenu = (e) => {
    let {innerText} = e.target
    if (innerText === "Logout") logout()
    setAnchorElUser(null);
  };

  const loggedIn = (
    <>
      {currProvider ? (
        <>
          <QrCodeModal
            show={showQrModal}
            setShow={setShowQrModal}
            providerId={currProvider.id}
          />
          <Nav.Link
            to={`/intake?provider=${currProvider.id}`}
            eventKey={1}
            as={NavLink}
            className="mx-3"
          >
            Intake Form
          </Nav.Link>
          <button
            className="nav-link text-start ms-2 ms-md-0"
            onClick={() => setShowQrModal(true)}
          >
            QR Code
          </button>
        </>
      ) : null}
    </>
  );

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            //   letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Smartnosis
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {/* {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))} */}
          {currProvider ? loggedIn : null}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" >{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
