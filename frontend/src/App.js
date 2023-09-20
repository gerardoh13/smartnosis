import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import NavRoutes from "./navigation/NavRoutes";
import { useLocalStorage } from "./hooks";
import Spinner from "./common/Spinner";
import SmartnosisApi from "./api";
import { decodeToken } from "react-jwt";
import ProviderContext from "./common/ProviderContext";
// import Navbar from "./navigation/Navbar";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "./navigation/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "./navigation/ResponsiveAppBar";

function App() {
  const [token, setToken] = useLocalStorage("smartnosis-token");
  const [currProvider, setCurrProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  useEffect(() => {
    async function getCurrProvider() {
      if (token) {
        try {
          let { email } = decodeToken(token);
          SmartnosisApi.token = token;
          let provider = await SmartnosisApi.getCurrProvider(email);
          setCurrProvider(provider);
        } catch (err) {
          console.log(err);
          setCurrProvider(null);
        }
      }
      setLoading(false);
    }
    setLoading(true);
    getCurrProvider();
  }, [token]);

  const register = async (data) => {
    try {
      let providerToken = await SmartnosisApi.registerProvider(data);
      setToken(providerToken);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const logout = async () => {
    setCurrProvider(null);
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
            currProvider,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* <Navbar logout={logout} /> */}
            {currProvider ? (
              <>
              <SideBar toggleDrawer={toggleDrawer} open={open} />
              <ResponsiveAppBar
              toggleDrawer={toggleDrawer}
              open={open}
              logout={logout}
            />
              </>
            ) : null}

            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid
                  container
                  spacing={3}
                  // alignItems="center"
                  justifyContent="center"
                >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <NavRoutes register={register} login={login} />
                    )}
                </Grid>
              </Container>
            </Box>
          </Box>
        </ProviderContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
