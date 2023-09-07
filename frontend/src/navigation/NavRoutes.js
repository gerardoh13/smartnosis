import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import Intake from "../intake/Intake";
// import PrivateRoutes from "./PrivateRoutes";
// import PublicRoutes from "./PublicRoutes";
// import ProviderContext from "../common/ProviderContext";

function NavRoutes({ login, register }) {
    // const { currProvider } = useContext(ProviderContext);

  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/login" element={<Login login={login} />} />
      <Route  path="/intake" element={<Intake />} />
      <Route
        exact
        path="/register"
        element={<Register register={register} />}
      />
      {/* <Route element={<PublicRoutes />}>
        <Route exact path="/reset" element={<ResetPwd />} />
      </Route> */}
      {/* <Route element={<PrivateRoutes />}>
        <Route exact path="/calendar" element={<Calendar />} />
      </Route> */}
    </Routes>
  );
}

export default NavRoutes;
