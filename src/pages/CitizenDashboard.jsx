import React from "react";
import { auth } from "../utils/Firebase";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardLinkButton from "../components/DashboardLinkButton";
import {
  faEdit,
  faMobileScreen,
  faSignOut,
  faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";
import ReportedComplaints from "../components/ReportedComplaints";
import { useEffect } from "react";
import { isOfficial } from "../utils/FirebaseFunctions";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        return navigate("/citizen-login");
      } else {
        isOfficial(user.uid).then((res) => {
          if (res) {
            navigate("/official-dashboard");
          }
        });
      }
    });
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <h2 className=" lg:mt-10 leading-normal font-bold text-center text-xl lg:text-[2rem] my-8 lg:text-left lg:mx-20">
        Dashboard
      </h2>
      <div className="grid lg:grid-cols-[0.8fr_0.6fr] mx-10">
        <div>
          <DashboardLinkButton
            icon={faEdit}
            name={"New Complaint"}
            link={"/report"}
          />
          <DashboardLinkButton
            icon={faTrafficLight}
            name={"Track Reported complaints"}
            link={"/track-complaints"}
            className={"lg:hidden"}
          />
          <DashboardLinkButton
            icon={faMobileScreen}
            name={"Install as an app (Mobile)"}
            link={"/report"}
            className={"lg:hidden"}
          />
          <DashboardLinkButton
            icon={faSignOut}
            name={"Logout"}
            onClick={handleLogout}
            className={"lg:hidden"}
          />
        </div>
        <div className="hidden lg:flex">
          <ReportedComplaints />
        </div>
      </div>
    </>
  );
};

export default CitizenDashboard;
