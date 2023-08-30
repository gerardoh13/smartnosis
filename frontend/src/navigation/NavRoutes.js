import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";

// import HomeAnon from "../components/HomeAnon";
import Intake from "../intake/Intake";
// import PrivateRoutes from "./PrivateRoutes";
// import PublicRoutes from "./PublicRoutes";
import UserContext from "../common/UserContext";

function NavRoutes({ login, signup }) {
  //   const { currUser } = useContext(UserContext);

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/form" element={<Intake />} />
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
