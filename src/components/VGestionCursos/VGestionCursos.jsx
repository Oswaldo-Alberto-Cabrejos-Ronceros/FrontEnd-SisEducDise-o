import "./VGestionCursos.css";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import VGestionCursosCursos from "./VGestionCursosCursos/VGestionCursosCursos";
import VGestionCursosSubCursos from "./VGestionCursosSubCursos/VGestionCursosSubCursos";
import VAsignacionSubCurso from "./VAsignacionSubCurso/VAsignacionSubCurso";
import { Tabs } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function VGestionCursos() {
  //para saber la ubicacion del router
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === "/administrador/gestioncursos/cursos") {
      setActiveIndex(0);
    } else if (location.pathname === "/administrador/gestioncursos/subcursos") {
      setActiveIndex(1);
    } else if (
      location.pathname === "/administrador/gestioncursos/asignacion"
    ) {
      setActiveIndex(2);
    }
  }, [location.pathname]);

  return (
    <div className="VGestionCursosContainer">
      <div className="VGestionCursosButtonsContainer">
        <Tabs.Root
          defaultValue={0}
          index={activeIndex}
          onChange={(index) => setActiveIndex(index)}
        >
          <Tabs.List>
            <Tabs.Trigger
              as={NavLink}
              value={0}
              to="/administrador/gestioncursos/cursos"
            >
              Cursos
            </Tabs.Trigger>
            <Tabs.Trigger
              as={NavLink}
              value={1}
              to="/administrador/gestioncursos/subcursos"
            >
              Subcursos
            </Tabs.Trigger>
            <Tabs.Trigger
              as={NavLink}
              value={2}
              to="/administrador/gestioncursos/asignacion"
            >
              Asignación
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
      <div className="CambGestionCursos">
        <Routes>
          <Route index element={<Navigate to={"cursos"} />} />
          <Route path="cursos" element={<VGestionCursosCursos />} />
          <Route path="subcursos" element={<VGestionCursosSubCursos />} />
          <Route path="asignacion" element={<VAsignacionSubCurso />} />
        </Routes>
      </div>
    </div>
  );
}

export default VGestionCursos;
