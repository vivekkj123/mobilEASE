import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CitizenLogin from "./pages/CitizenLogin";
import OfficialLogin from "./pages/OfficialLogin";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import ReportComplaint from "./pages/ReportComplaint";
import ReportedComplaints from "./components/ReportedComplaints";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/citizen-login",
    element: <CitizenLogin />,
  },
  {
    path: "/official-login",
    element: <OfficialLogin />,
  },
  {
    path: "/citizen-dashboard",
    element: <CitizenDashboard />,
  },
  {
    path: "/official-dashboard",
    element: <OfficialDashboard />,
  },
  {
    path: "/report",
    element: <ReportComplaint />,
  },
  {
    path: "/track-complaints",
    element: (
      <>
        <Navbar />
        <ReportedComplaints />
      </>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
