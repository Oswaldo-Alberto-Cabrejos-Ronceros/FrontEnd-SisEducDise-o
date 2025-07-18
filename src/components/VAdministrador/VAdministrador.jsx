import './VAdministrador.css'
import {Route, Routes, Navigate } from "react-router-dom";
import InfoUser from '../generalsComponets/InfoUser/InfoUser';
import BarraNavegacionAdministrador from '../BarraNavegacionAdministrador/BarraNavegacionAdministrador';
import VNotasAdministrador from '../VNotasAdministrador/VNotasAdministrador';
import VHonorAdministrador from '../VHonorDocenteAdministrador/VHonorDocenteAdministrador';
import VInformesAdministrador from '../VInformesDocenteAdministrador/VInformesDocenteAdministrador';
import VCursosAdministrador from '../VCursosAdministrador/VCursosAdministrador';
import VCursoAdministradorContenido from '../VCursoDocenteAdministradorContenido/VCursoDocenteAdministradorContenido';
import VHorarioAdministrador from '../VHorarioAdministrador/VHorarioAdministrador'
import VGestionCursos from '../VGestionCursos/VGestionCursos';
import VGestionUsuarios from '../VGestionUsuarios/VGestionUsuarios'
import { ScrollAndFocusToMain } from '../ScrollAndFocusToMain/ScrollAndFocusToMain';

function VAdministrador() {

  return (
    <div className='VAdministradorMain'>
      <ScrollAndFocusToMain/>
      <BarraNavegacionAdministrador/>
      <main className='containerCambAdministrador' tabIndex="-1" id="main-content">
      <Routes>
      <Route index element={<Navigate to="cursos" />} />
            <Route path="cursos/*" element={<VCursosAdministrador />} />
            <Route path="horario/*" element={<VHorarioAdministrador/>} />
            <Route path="notas/*" element={<VNotasAdministrador/>} />
            <Route path="gestionusuarios/*" element={<VGestionUsuarios />} />
            <Route path="gestioncursos/*" element={<VGestionCursos />} />
            <Route path="honor/*" element={<VHonorAdministrador/>} />
            <Route path="curso/*" element={<VCursoAdministradorContenido/>} />
            <Route path="informes/*" element={<VInformesAdministrador pathBase="/administrador/informes"/>} />
            <Route path="usuario" element={<InfoUser />} />
      </Routes>
      </main>
    </div>

  )
}

export default VAdministrador