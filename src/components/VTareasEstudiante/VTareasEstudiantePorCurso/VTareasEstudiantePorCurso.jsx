import "./VTareasEstudiantePorCurso.css";
import ComBoxTareaXUnidadEstudiante from "../../generalsComponets/ComBoxTareaXUnidadEstudiante/ComBoxTareaXUnidadEstudiante";
import PropTypes from "prop-types";

function VTareasEstudiantePorCurso({to, tareasCurso, tareas }) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className="VTareasEstudiantePorCursoContainer">
      <div className="VTareasEstudiantePorCursoTitleContainer">
        <h3>Por curso</h3>
      </div>
      <div className="VTareasEstudiantePorCursoContent">
        {tareas.map((tarea,index) => {
          unidadString = unidad + numerounidad;
          numerounidad++;
          return (
            <ComBoxTareaXUnidadEstudiante key={index}
              unidad={unidadString}
              tareas={tarea}
              to={to}
              curso={tareasCurso}
            />
          );
        })}
      </div>
    </div>
  );
}

VTareasEstudiantePorCurso.propTypes={
  to:PropTypes.string.isRequired,
  tareasCurso:PropTypes.array.isRequired,
  tareas:PropTypes.array.isRequired
}

export default VTareasEstudiantePorCurso;
