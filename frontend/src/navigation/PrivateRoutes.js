import React, { useContext } from "react";
import UserContext from "../users/UserContext";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const { currUser } = useContext(UserContext);

  if (!currUser) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PrivateRoutes;
