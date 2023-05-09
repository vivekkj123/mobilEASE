import React from "react";
import Logo from "/src/assets/logo.png";
import MuiButton from "@mui/material/Button";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CitizenLogin from "../pages/CitizenLogin";

export const Button = styled(MuiButton)((props) => ({
  borderRadius: "25px",
  color: "#111",
  borderColor: "#111",
  padding: "8px 25px",
  ":hover": {
    borderColor: "#080",
  },
}));
const Navbar = () => {
  const [Visible, setVisible] = useState(false);
  return (
    <>
      <div className="Navbar w-screen flex justify-between items-center px-4 py-2 lg:py-4 lg:px-8">
        <Link to="/">
          <div className="LogoGroup flex items-center gap-3">
            <img className="logo h-8 lg:h-12" src={Logo} />
            <h2 className="font-bold text-sm lg:text-lg">TRAFFIC HERO</h2>
          </div>
        </Link>
        <div className="ButtonGroup gap-8 hidden lg:flex">
          <Button component={Link} to={"/official-login"} variant="outlined">
            Official Login
          </Button>
          <Button component={Link} to={"/citizen-login"} variant="outlined">
            Citizen Login
          </Button>
        </div>
        <FontAwesomeIcon
          className="lg:hidden"
          icon={Visible ? faClose : faBars}
          onClick={() => {
            setVisible(!Visible);
          }}
        />
      </div>
      <div
        className={`MenuMobile lg:hidden w-full text-center py-20 absolute bg-white z-10 rounded-3xl ${
          Visible ? "block" : "hidden"
        }`}
      >
        <ul className=" flex flex-col gap-16 font-bold">
          <Link to={"/citizen-login"}>Citizen Login</Link>
          <Link to={"/official-login"}>Official Login</Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
