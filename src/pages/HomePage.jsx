import React from "react";
import Navbar from "/src/components/Navbar";
import TrafficArt from "/src/assets/traffic-art.png";
import RegisterAccount from "../components/RegisterAccount";
const HomePage = () => {
  return (
    <div className="HomePage">
      <Navbar />
      <div className="HomeContainer grid grid-cols-1 lg:grid-cols-2 items-center px-5 lg:px-20">
        <img className="TrafficArt hidden lg:block h-[32rem]" src={TrafficArt} alt="" />
        <div>
          <h3 className="slogan mt-[25%] lg:mt-0 leading-normal font-bold text-center text-base lg:text-[2rem]">
            REPORT TRAFFIC VIOLATIONS AND PROBLEMS ON ROAD !!!
          </h3>
          <RegisterAccount />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
