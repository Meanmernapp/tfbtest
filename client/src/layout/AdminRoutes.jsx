import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../components/LoadingPage";

const AdminPage = () => {
  const auth = useSelector(({ auth }) => auth);
  if (auth.loading) {
    return <LoadingPage />;
  }
  if (!auth.profile?._id) {
    return <Navigate to="/log-in" />;
  }
  if (auth.profile && auth.profile._id) {
    if (auth.profile.type === "admin") {
      return <Outlet />;
    } else if (auth.profile.type !== "admin") {
      return <Navigate to="/" />;
    }
  }
};

export default AdminPage;
