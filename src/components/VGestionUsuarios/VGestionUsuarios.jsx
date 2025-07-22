import "./VGestionUsuarios.css";
import VGestionEstudiante from "./VGestionEstudiante/VGestionEstudiante";
import VGestionDocentes from "./VGestionDocentes/VGestionDocentes";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
function VGestionUsuarios() {
  //para indice activo
  //para saber la ubicacion de la ruta
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === "/administrador/gestionusuarios/estudiantes") {
      setActiveIndex(0);
    } else if (
      location.pathname === "/administrador/gestionusuarios/docentes"
    ) {
      setActiveIndex(1);
    }
  }, [location.pathname]);

  return (
    <div className="VGestionUsuariosContainer">
      <div className="VGestionUsuariosButtonsContainer">
        <Tabs.Root
          defaultValue={0}
          index={activeIndex}
          onChange={(index) => setActiveIndex(index)}
        >
          <Tabs.List>
            <Tabs.Trigger
              as={NavLink}
              value={0}
              to="/administrador/gestionusuarios/estudiantes"
            >
              Estudiantes
            </Tabs.Trigger>
            <Tabs.Trigger
              as={NavLink}
              value={1}
              to="/administrador/gestionusuarios/docentes"
            >
              Docentes
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
      <div className="CambGestionUsuarios">
        <Routes>
          <Route index element={<Navigate to="estudiantes" replace />} />
          <Route path="estudiantes" element={<VGestionEstudiante />} />
          <Route path="docentes" element={<VGestionDocentes />} />
        </Routes>
      </div>
    </div>
  );
}

export default VGestionUsuarios;
