import React, { useContext } from "react";
import ProviderContext from "../common/ProviderContext";
import { Outlet, Navigate } from "react-router-dom";

function PublicRoutes() {
  const { currProver } = useContext(ProviderContext);

  if (currProver) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PublicRoutes;
