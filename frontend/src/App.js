import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import NavRoutes from "./navigation/NavRoutes";
import { useLocalStorage } from "./hooks";
import Spinner from "./common/Spinner";
import SmartnosisApi from "./api";
import { decodeToken } from "react-jwt";
import ProviderContext from "./common/ProviderContext";
import Navbar from "./navigation/Navbar";

function App() {
  const [token, setToken] = useLocalStorage("smartnosis-token");
  const [currProvider, setCurrProvider] = useState(null);
  const [loading, setLoading] = useState(true);

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
      console.log(errors)
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
          <Navbar logout={logout} />
          {loading ? <Spinner /> : <NavRoutes register={register} login={login} />}
        </ProviderContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
