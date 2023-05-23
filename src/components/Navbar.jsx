import React, { useEffect } from "react";
import Logo from "/src/assets/logo.png";
import MuiButton from "@mui/material/Button";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CitizenLogin from "../pages/CitizenLogin";
import { auth } from "../utils/Firebase";

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
  const [User, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    navigate("/");
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <>
      <div className="Navbar w-screen flex justify-between items-center px-4 py-2 lg:py-4 lg:px-8">
        <Link to="/">
          <div className="LogoGroup flex items-center gap-3">
            <img className="logo h-8 lg:h-12" src={Logo} />
            <h2 className="font-bold text-sm lg:text-lg">TRAFFIC HERO</h2>
          </div>
        </Link>
        {User ? (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button
              component={Link}
              to={User.official ? "/official-dashboard" : "/citizen-dashboard"}
              variant="outlined"
            >
              Dashboard
            </Button>
            <Button onClick={handleLogout} variant="outlined">
              Logout
            </Button>
          </div>
        ) : (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button component={Link} to={"/official-login"} variant="outlined">
              Official Login
            </Button>
            <Button component={Link} to={"/citizen-login"} variant="outlined">
              Citizen Login
            </Button>
          </div>
        )}

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
          {User ? (
            <>
              <Link
                to={
                  User.official ? "/official-dashboard" : "/citizen-dashboard"
                }
              >
                Dashboard
              </Link>
              <Link onClick={handleLogout}>Logout</Link>{" "}
            </>
          ) : (
            <>
              <Link to={"/citizen-login"}>Citizen Login</Link>
              <Link to={"/official-login"}>Official Login</Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
