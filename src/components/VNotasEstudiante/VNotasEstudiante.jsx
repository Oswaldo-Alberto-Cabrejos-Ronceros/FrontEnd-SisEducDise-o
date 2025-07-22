import "./VNotasEstudiante.css";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import VNotasEstudianteCurso from "../VNotasEstudiante/VNotasEstudianteCurso/VNotasEstudianteCurso";
import VNotasEstudianteUnidad from "./VNotasEstudianteUnidad/VNotasEstudianteUnidad";
import VNotasEstudianteBimestre from "../VNotasEstudiante/VNotasEstudianteBimestre/VNotasEstudianteBimestre";
import VNotasEstudianteElement from "./VNotasEstudianteElement/VNotasEstudianteElement";
import { Tabs } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function VNotasEstudiante() {
  //para saber la ubicacion del router
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === "/estudiante/notas/curso") {
      setActiveIndex(0);
    } else if (location.pathname === "/estudiante/notas/unidad") {
      setActiveIndex(1);
    } else if (location.pathname === "/estudiante/notas/bimestre") {
      setActiveIndex(2);
    }
  }, [location.pathname]);

  return (
    <div className="VNotasEstudianteContainer">
      <div className="VNotasEstudianteTitle">
        <h3>Notas</h3>
      </div>
      <div className="VNotasEstudianteButtonsContainer">
        <Tabs.Root
          defaultValue={0}
          index={activeIndex}
          onChange={(index) => setActiveIndex(index)}
        >
          <Tabs.List>
            <Tabs.Trigger as={NavLink} value={0} to="/estudiante/notas/curso">
              Curso
            </Tabs.Trigger>
            <Tabs.Trigger as={NavLink} value={1} to="/estudiante/notas/unidad">
              Unidad
            </Tabs.Trigger>
            <Tabs.Trigger
              as={NavLink}
              value={2}
              to="/estudiante/notas/bimestre"
            >
              Bimestre
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
      <div className="VNotasEstudianteCamb">
        <Routes>
          <Route index element={<Navigate to={"curso"} />} />
          <Route path="curso/*" element={<VNotasEstudianteCurso />} />
          <Route path="unidad/*" element={<VNotasEstudianteUnidad />} />
          <Route path="bimestre/*" element={<VNotasEstudianteBimestre />} />
          <Route path="info/:tipo" element={<VNotasEstudianteElement />} />
        </Routes>
      </div>
    </div>
  );
}

export default VNotasEstudiante;
