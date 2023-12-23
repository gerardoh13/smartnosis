import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes({ currUser }) {
  if (!currUser) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PrivateRoutes;
