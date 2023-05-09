import React from "react";
import MuiTextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const TextField = styled(MuiTextField)((props) => ({
  width: "100%",
  [`& fieldset`]: {
    borderRadius: "15px",
  },
}));
const RegisterAccount = () => {
  return (
    <div
      className="RegisterAccount flex flex-col gap-5 items-center 
      border-solid border-gray-500 px-3 lg:px-4 py-5 mx-4 lg:mx-12 rounded-3xl
      border-2 shadow-[0px_20px_20px_10px_#00000024] bg-opacity-20
    "
    >
      <p className="Slogan text-sm lg:text-xl text-center">
        Register a account to be a <b>HERO</b>
      </p>
      <form action="" className=" flex flex-col gap-5 w-full">
        <TextField variant="outlined" label="Full Name" required />
        <TextField variant="outlined" label="E-mail" type="email" required />
        <TextField variant="outlined" label="Phone No." type="tel" required />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          required
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          required
        />
        <Button variant="contained" type="submit">
          REGISTER
        </Button>
      </form>
    </div>
  );
};

export default RegisterAccount;
