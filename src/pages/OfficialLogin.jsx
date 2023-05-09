import React from "react";
import Navbar from "../components/Navbar";
import { TextField } from "../components/RegisterAccount";
import { Button } from "@mui/material";

const OfficialLogin = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className=" lg:px-96 px-4 h-3/4 flex flex-col justify-center">
        <h2 className="mt-[25%] lg:mt-0 leading-normal font-bold text-center text-base lg:text-[2rem] my-8">
          Official Login
        </h2>
        <div
          className="LoginBox flex flex-col gap-5 items-center 
      border-solid border-gray-500 px-3 lg:px-12 py-12 mx-4 lg:mx-12 rounded-3xl
      border-2 shadow-[0px_20px_20px_10px_#00000024] bg-opacity-20 lg:h-3/4
      justify-center
    "
        >
          <form action="" className=" flex flex-col gap-5 w-full">
            <TextField
              variant="outlined"
              label="E-mail"
              type="email"
              required
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              required
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficialLogin;
