import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import NavRoutes from "./navigation/NavRoutes";
import { useLocalStorage } from "./hooks";
import Spinner from "./common/Spinner";
import SmartnosisApi from "./api";
import { decodeToken } from "react-jwt";
import ProviderContext from "./common/ProviderContext";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "./navigation/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "./navigation/AppBar";
import Footer from "./common/Footer";

function App() {
  const [token, setToken] = useLocalStorage("smartnosis-token");
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(window.innerWidth >= 576);
  const [currView, setCurrView] = useState("Appts");
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 576);

  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          let { id, role, providerId } = decodeToken(token);
          SmartnosisApi.token = token;
          let user = await SmartnosisApi.getCurrUser(providerId, id, role);
          setCurrUser(user);
        } catch (err) {
          console.log(err);
          setCurrUser(null);
        }
      }
      setLoading(false);
    }
    setLoading(true);
    getCurrUser();
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 576);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const registerUser = async (data) => {
    try {
      let userToken = await SmartnosisApi.registerUser(data);
      setToken(userToken);
      return { success: true };
    } catch (errors) {
      console.log(errors)
      return { success: false, errors };

    }
  };

  const logout = async () => {
    setCurrUser(null);
    setToken(null);
  };

  const login = async (data) => {
    try {
      let providerToken = await SmartnosisApi.login(data);
      setToken(providerToken);
      return { valid: true };
    } catch (errors) {
      console.log(errors);
      return { valid: false, errors };
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <ProviderContext.Provider
          value={{
            currUser,
            isXsScreen,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {currUser ? (
              <>
                <SideBar
                  toggleDrawer={toggleDrawer}
                  open={open}
                  setCurrView={setCurrView}
                />
                <AppBar
                  toggleDrawer={toggleDrawer}
                  open={open}
                  logout={logout}
                  orgName={currUser.provider.name}
                  firstName={currUser.firstName}
                />
              </>
            ) : null}

            <Box
              component="main"
              sx={[
                {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  minHeight: "100vh",
                  overflow: "auto",
                },
                !currUser && {
                  display: "flex",
                  justifyContent: "center", // Center vertically
                  flexDirection: "column",
                  backgroundImage: "url(smartnosisbg.jpg)",
                },
              ]}
            >
              {currUser ? <Toolbar /> : null}
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} justifyContent="center">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <NavRoutes
                      registerUser={registerUser}
                      login={login}
                      currView={currView}
                      setCurrView={setCurrView}
                    />
                  )}
                </Grid>
                <Footer sx={{ pt: 4 }} />
              </Container>
            </Box>
          </Box>
        </ProviderContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
