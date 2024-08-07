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
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ProviderContext from "../common/ProviderContext";
import QrCodeModal from "../common/QrCodeModal";
import EventIcon from "@mui/icons-material/Event";
// import RefreshIcon from "@mui/icons-material/Refresh";

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
  const { currUser, isXsScreen } = useContext(ProviderContext);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleClick = (view) => {
    setCurrView(view);
    if (isXsScreen) toggleDrawer();
  };

  const contents = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: 200,
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
        {/* toggle appointment view */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick("Appts")}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={"Appointments"} />
          </ListItemButton>
        </ListItem>
        {/* toggle intake view */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick("Intakes")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Intakes"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* toggle intake */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick("Form")}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary={"Intake Form"} />
          </ListItemButton>
        </ListItem>
        {/* QR Code */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setShowQrModal(true)}>
            <ListItemIcon>
              <QrCodeIcon />
            </ListItemIcon>
            <ListItemText primary="QR Code" />
          </ListItemButton>
        </ListItem>
                {/* toggle intake */}
                <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick("PBAssessment")}>
            <ListItemIcon>
              <SportsMmaIcon />
            </ListItemIcon>
            <ListItemText primary={"Post-Bout"} />
          </ListItemButton>
        </ListItem>
        {/* Admin */}
        {currUser.isAdmin ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("Admin")}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        ) : null}
      </List>
    </>
  );

  return (
    <>
      <QrCodeModal
        show={showQrModal}
        setShow={setShowQrModal}
        providerId={currUser.id}
      />
      {!isXsScreen ? (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            zIndex: "1020",
          }}
        >
          {contents}
        </Drawer>
      ) : (
        <MuiDrawer
          open={open}
          sx={{
            zIndex: "1020",
          }}
        >
          {contents}
        </MuiDrawer>
      )}
    </>
  );
}
