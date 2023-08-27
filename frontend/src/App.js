import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import NavRoutes from "./navigation/NavRoutes";
// import { useLocalStorage } from "./hooks";
import Spinner from "./common/Spinner";

function App() {
  // const [token, setToken] = useLocalStorage("smartnosis-token");
  // const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, "1000");
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <UserContext.Provider
          value={{
            currUser,
          }}
        > */}
          {loading ? <Spinner /> : <NavRoutes />}
        {/* </UserContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
