import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import NavRoutes from "./navigation/NavRoutes";
import { useLocalStorage } from "./hooks";
import Spinner from "./common/Spinner";
import SmartnosisApi from "./api";
import { decodeToken } from "react-jwt";

function App() {
  const [token, setToken] = useLocalStorage("smartnosis-token");
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          let { email } = decodeToken(token);
          SmartnosisApi.token = token;
          let user = await SmartnosisApi.getCurrUser(email);
          setCurrUser(user);
        } catch (err) {
          console.log(err);
          setCurrUser(null);
        }
      }
    }
    setLoading(true);
    getCurrUser();
    setLoading(false);
  }, []);

  const register = async (data) => {
    try {
      let userToken = await SmartnosisApi.registerUser(data);
      setToken(userToken);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* <UserContext.Provider
          value={{
            currUser,
          }}
        > */}
          {loading ? <Spinner /> : <NavRoutes signup={register}/>}
        {/* </UserContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
