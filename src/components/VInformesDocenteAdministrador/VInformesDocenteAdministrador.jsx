import "./VInformesDocenteAdministrador.css";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import VInformesDocenteAdministradorAuxiliar from "./VInformesDocenteAdministradorAuxiliar/VInformesDocenteAdministradorAuxiliar";
import VInformesDocenteAdministradorBimestral from "./VInformesDocenteAdministradorBimestral/VInformesDocenteAdministradorBimestral";
import { Tabs } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function VInformesDocenteAdministrador({pathBase}) {
  //para indice activo
  //para saber la ubicacion de la ruta
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === `${pathBase}/auxiliar`) {
      setActiveIndex(0);
    } else if (location.pathname === `${pathBase}/bimestral`) {
      setActiveIndex(1);
    }
  }, [location.pathname,pathBase]);


  return (
    <div className="VInformesDocenteAdministradorContainer">
      <div className="VInformesDocenteAdministradorTitleContainer">
        <h3>Informes</h3>
      </div>
      <div className="VInformesDocenteAdministradorButtonsContainer">
        <Tabs.Root
          defaultValue={0}
          index={activeIndex}
          onChange={(index) => setActiveIndex(index)}
        >
          <Tabs.List>
            <Tabs.Trigger
              as={NavLink}
              value={0}
              to={`${pathBase}/auxiliar`}
            >
              Auxiliar
            </Tabs.Trigger>
            <Tabs.Trigger
              as={NavLink}
              value={1}
              to={`${pathBase}/bimestral`}
            >
              Bimestral
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
      <div className="CambVInformesDocenteAdministrador">
        <Routes>
          <Route index element={<Navigate to={"auxiliar"} />} />
          <Route
            path="auxiliar"
            element={<VInformesDocenteAdministradorAuxiliar />}
          />
          <Route
            path="bimestral"
            element={<VInformesDocenteAdministradorBimestral />}
          />
        </Routes>
      </div>
    </div>
  );
}

VInformesDocenteAdministrador.propTypes={
  pathBase:PropTypes.string.isRequired
}

export default VInformesDocenteAdministrador;
