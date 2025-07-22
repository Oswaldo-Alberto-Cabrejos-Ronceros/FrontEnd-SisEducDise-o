import {useState,useEffect} from "react";
import './VHorarioEstudianteDocente.css'
import CardHorario from "../generalsComponets/CardHorario/CardHorario";
import horarioService from "../../services/horarioService";
import PropTypes from "prop-types";

function VHorarioEstudianteDocente({grado_Apellidos, nivel_Nombres}) {
  const [userUsuario, setUserUsuario] = useState({});
  const [urlHorario,setUrlHorario]=useState("");

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserUsuario(userData || {}); // Actualizar estado (opcional)
    if (userData) {
      if(userUsuario.rol==="PROFESOR"){
        horarioService
        .obtenerHorarioProfesor(userData.usuarioId)
        .then((response) => {
          setUrlHorario(response.data.urlArchivo);
        })
        .catch((error) => {
          console.error("Error al obtener el horario:", error);
        });
      } else{
        horarioService
        .obtenerHorarioAlumno(userData.nivel, userData.grado, userData.seccion)
        .then((response) => {
          setUrlHorario(response.data.urlArchivo);
        })
        .catch((error) => {
          console.error("Error al obtener el horario:", error);
          setUrlHorario("");
        });
      }
    }
  }, []);

  return (
    <div className="VHorarioEstudianteDocenteContainer">
      <div className="VHorarioEstudianteDocenteTitle">
        <h3>Horario</h3>
      </div>
      <div className="HorarioContainer">
      <CardHorario grado={grado_Apellidos} nivel={nivel_Nombres} url={urlHorario}/>
      </div>
    </div>
  );
}

VHorarioEstudianteDocente.propTypes={
  grado_Apellidos:PropTypes.string.isRequired,
  nivel_Nombres:PropTypes.string.isRequired
}

export default VHorarioEstudianteDocente;
