import React, { useEffect } from "react";
import { auth } from "../utils/Firebase";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

const OfficialDashboard = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user || !isOfficial(user.uid)) {
        return <Navigate to="/official-login" replace />;
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <div>OfficialDashboard</div>
    </>
  );
};

export default OfficialDashboard;
