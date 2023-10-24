import React, { useContext, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import IconButton from "@mui/material/IconButton";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Nav from "react-bootstrap/Nav";
import ProviderContext from "../common/ProviderContext";
import QrCodeModal from "../common/QrCodeModal";

const drawerWidth = 200;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function SideBar({ toggleDrawer, open, setCurrView }) {
  const { currProvider } = useContext(ProviderContext);
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <>
      {currProvider ? (
        <>
          <QrCodeModal
            show={showQrModal}
            setShow={setShowQrModal}
            providerId={currProvider.id}
          />
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
                background: "#1976d2",
              }}
            >
              <IconButton onClick={toggleDrawer} className="text-light">
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setCurrView("Appointments")}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Appointments"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setCurrView("Intakes")}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Intakes"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <Nav.Link
                  to={`/intake?provider=${currProvider.id}`}
                  as={ListItemButton}
                >
                  <ListItemIcon>
                    <FormatListNumberedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Intake Form"} />
                </Nav.Link>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setShowQrModal(true)}>
                  <ListItemIcon>
                    <QrCodeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"QR Code"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </>
      ) : null}
    </>
  );
}
