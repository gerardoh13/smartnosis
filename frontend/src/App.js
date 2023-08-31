import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import NavRoutes from "./navigation/NavRoutes";
import { useLocalStorage } from "./hooks";
import Spinner from "./common/Spinner";
import SmartnosisApi from "./api";
import { decodeToken } from "react-jwt";
import ProviderContext from "./common/ProviderContext";

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
    }
    setLoading(true);
    getCurrProvider();
    setLoading(false);
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

  return (
    <div className="App">
      <BrowserRouter>
        <ProviderContext.Provider
          value={{
            currProvider,
          }}
        >
          {loading ? <Spinner /> : <NavRoutes register={register}/>}
        </ProviderContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
