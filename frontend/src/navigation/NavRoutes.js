import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import Intake from "../intake/Intake";
import ResetPwd from "../components/ResetPwd";
// import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import ProviderContext from "../common/ProviderContext";
import Pdf from "../components/Pdf";

function NavRoutes({ login, register, currView, setCurrView }) {
  const { currProvider } = useContext(ProviderContext);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          currProvider ? (
            <Dashboard currView={currView} setCurrView={setCurrView} />
          ) : (
            <Login login={login} />
          )
        }
      />
      <Route path="/intake" element={<Intake />} />
      <Route path="/pdf" element={<Pdf />} />

      <Route element={<PublicRoutes />}>
        <Route path="/reset" element={<ResetPwd />} />
        <Route path="/register" element={<Register register={register} />} />
      </Route>

      {/* <Route element={<PrivateRoutes />}>
        <Route exact path="/calendar" element={<Calendar />} />
      </Route> */}
    </Routes>
  );
}

export default NavRoutes;
