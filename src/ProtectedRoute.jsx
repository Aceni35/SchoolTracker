import React from "react";
import Login from "./pages/Login";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { token } = useSelector((store) => store.home);

  if (token == null) {
    return <Login />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
