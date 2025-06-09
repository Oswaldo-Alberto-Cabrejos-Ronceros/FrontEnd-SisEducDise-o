import "./VHonorDocenteAdministrador.css";
import { Routes, Route,} from "react-router-dom";
import VHonorDocenteUnidad from "../VHonorDocenteAdministrador/VHonorDocenteAdministradorUnidad/VHonorDocenteAdministradorUnidad";

function VHonorDocenteAdministrador() {

  return (
    <div className="VHonorDocenteAdministradorContainer">
      <div className="VHonorDocenteAdministradorTitleContainer">
        <h3>Honor</h3>
      </div>
      <div className="CambVHonorDocenteAdministrador">
        <Routes>
          <Route index element={<VHonorDocenteUnidad/>} />
        </Routes>
      </div>
    </div>
  );
}

export default VHonorDocenteAdministrador;
