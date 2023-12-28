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
      <div className="HomeContainer grid grid-cols-1 lg:grid-cols-5 items-center px-5 lg:px-20 gap-1">
        {/* Adicione a imagem da logo aqui */}
        <img className="logo h-50 lg:h-63 w-72" src={Logo} alt="Logo" />

        {/* Imagem TrafficArt */}
        <img
          className="TrafficArt hidden lg:block w-1/1 ml-1"
          src={TrafficArt}
          alt="Traffic Art"
        />

        {/* Conteúdo do lado das imagens */}
        <div className="lg:col-span-3"> {/* Ajuste o número conforme necessário */}
          <h3 className="slogan lg:mt-9 leading-normal font-bold text-center text-base lg:text-[2rem]">
            ESTAMOS AQUI PARA TE OUVIR
          </h3>
          <RegisterAccount />
        </div>

        {/* Adicione outros elementos aqui, se necessário */}
      </div>
    </div>
  );
};

export default HomePage;
