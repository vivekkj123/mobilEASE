import styled from "@emotion/styled";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MuiButton from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import Logo from "/src/assets/logo.png";

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
  const [Official, setOfficial] = useState(false);
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
        isOfficial(user.uid).then((res) => {
          setOfficial(res);
        });
      }
    });
  }, []);

  return (
    <>
      <div className="Navbar w-screen flex justify-between items-center px-4 py-2 lg:py-4 lg:px-8 mt-2">
        <Link to="/">
          <Button component={Link} to="/" variant="outlined">
            Início
          </Button>
        </Link>
        {User ? (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button
              component={Link}
              to={Official ? "/official-dashboard" : "/citizen-dashboard"}
              variant="outlined"
            >
              Painel
            </Button>
            <Button onClick={handleLogout} variant="outlined">
              Sair
            </Button>
          </div>
        ) : (
          <div className="ButtonGroup gap-8 hidden lg:flex">
            <Button component={Link} to={"/official-login"} variant="outlined">
              Login do Gestor
            </Button>
            <Button component={Link} to={"/citizen-login"} variant="outlined">
              Login do Cidadão
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
        } mt-2`}
      >
        <ul className=" flex flex-col gap-16 font-bold">
          {User ? (
            <>
              <Link
                to={Official ? "/official-dashboard" : "/citizen-dashboard"}
              >
                Painel
              </Link>
              <Link onClick={handleLogout}>Logout</Link>{" "}
            </>
          ) : (
            <>
              <Link to={"/citizen-login"}>Login do Cidadão</Link>
              <Link to={"/official-login"}>Login do Gestor</Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
