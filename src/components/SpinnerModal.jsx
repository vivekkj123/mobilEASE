import React from "react";
import { RotateLoader } from "react-spinners";

const SpinnerModal = ({ visible }) => {
  return (
    <div
      className={`bg-black bg-opacity-90 h-screen w-full fixed flex justify-center items-center z-20 flex-col ${
        visible ? "block" : "hidden"
      }`}
    >
      <RotateLoader color="#fef303" />
      <p className="text-white font-extrabold mt-20 text-xl">Please Wait</p>
    </div>
  );
};

export default SpinnerModal;
