import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterAccount from "../components/RegisterAccount";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import TrafficArt from "/src/assets/traffic-art.png";
import Navbar from "/src/components/Navbar";
import Logo from "/src/assets/logo.png"; // Importe a imagem da logo

const HomePage = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState(null);
  const [Official, setOfficial] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && !isOfficial(user.uid)) {
        navigate("/citizen-dashboard");
      } else if (user && isOfficial(user.uid)) {
        navigate("/official-dashboard");
      }
      setUser(user);
      isOfficial(user?.uid).then((res) => {
        setOfficial(res);
      });
    });
  }, [navigate]);

  return (
    <div className="HomePage">
      <Navbar />
      <div className="HomeContainer grid grid-cols-1 lg:grid-cols-5 items-center px-1 lg:px-20 gap-1">
        {/* Adicione a imagem da logo aqui */}
        <div className="flex items-center justify-center lg:col-span-1">
          <img className="logo max-w-[230px] max-h-[180px] h-50 lg:h-63 w-72 mx-auto" src={Logo} alt="Logo" />
        </div>

        {/* Imagem TrafficArt */}
        <div className="lg:col-span-1">
          <img
            className="TrafficArt w-full lg:w-auto mx-auto max-w-[250px] max-h-[150px] mt-90" // Removi a margem superior
            src={TrafficArt}
            alt="Traffic Art"
          />
        </div>

        {/* Register Account */}
        <div className="lg:col-span-3 mt-8"> {/* Ajuste o número conforme necessário */}
          <h3 className="slogan lg:mt-2 leading-normal font-bold text-center text-base lg:text-[2rem]">
            ESTAMOS AQUI PARA TE OUVIR
          </h3>
          <RegisterAccount className="lg:w-full mx-auto" /> {/* Adicione a classe lg:w-full e mx-auto para ocupar toda a largura e centralizar em telas grandes */}
        </div>

        {/* Adicione outros elementos aqui, se necessário */}
      </div>
    </div>
  );
};

export default HomePage;
