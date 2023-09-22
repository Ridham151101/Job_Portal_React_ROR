import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

function Private() {
  const token = localStorage.getItem("token");

  if (token === null) {
    return <Navigate replace to="/" />;
  }
  return <Outlet />;
}

export default memo(Private);
