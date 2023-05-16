import React from "react";
import { auth } from "../utils/Firebase";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

const OfficialDashboard = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return <Navigate to="/official-login" replace />;
  }
  return (
    <>
      <Navbar />
      <div>OfficialDashboard</div>
    </>
  );
};

export default OfficialDashboard;
