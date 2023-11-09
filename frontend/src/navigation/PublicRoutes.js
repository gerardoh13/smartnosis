import React, { useContext } from "react";
import ProviderContext from "../common/ProviderContext";
import { Outlet, Navigate } from "react-router-dom";

function PublicRoutes() {
  const { currProvider } = useContext(ProviderContext);
  if (currProvider) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PublicRoutes;
