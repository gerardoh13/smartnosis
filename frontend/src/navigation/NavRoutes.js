import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../Practice/Register";
import Dashboard from "../components/Dashboard";
import Intake from "../intake/Intake";
import ResetPwd from "../components/ResetPwd";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import ProviderContext from "../common/ProviderContext";

function NavRoutes({ login, registerUser, currView, setCurrView }) {
  const { currUser } = useContext(ProviderContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          currUser ? (
            <Dashboard currView={currView} setCurrView={setCurrView} />
          ) : (
            <Login login={login} />
          )
        }
      />
      <Route path="/intake" element={<Intake />} />

      <Route element={<PublicRoutes currUser={currUser} />}>
        <Route path="/reset" element={<ResetPwd />} />
        <Route
          path="/register"
          element={<Register registerUser={registerUser} />}
        />
      </Route>

      <Route element={<PrivateRoutes currUser={currUser} />}>
        {/* <Route path="/admin" element={<AdminHome />} /> */}
      </Route>
    </Routes>
  );
}

export default NavRoutes;
