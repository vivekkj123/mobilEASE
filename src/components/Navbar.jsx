import React from "react";
import Logo from "/src/assets/logo.png";
import MuiButton from "@mui/material/Button";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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
  return (
    <div className="Navbar w-screen flex justify-between items-center px-4 py-2 lg:py-4 lg:px-8">
      <Link to="/">
        <div className="LogoGroup flex items-center gap-3">
          <img className="logo h-8 lg:h-12" src={Logo} />
          <h2 className="font-bold text-sm lg:text-lg">TRAFFIC HERO</h2>
        </div>
      </Link>
      <div className="ButtonGroup gap-8 hidden lg:flex">
        <Button variant="outlined">Official Login</Button>
        <Button variant="outlined">Citizen Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
