import "./VCursoEstudianteContenidoTareas.css";
import ComBoxTareaXUnidadEstudiante from "../../../generalsComponets/ComBoxTareaXUnidadEstudiante/ComBoxTareaXUnidadEstudiante";
import PropTypes from "prop-types";


function VCursoEstudianteContenidoTareas({to, curso, tareas }) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className="VCursoEstudianteContenidoTareasContainer">
      {tareas.map((tarea,index) => {
        unidadString = unidad + numerounidad;
        numerounidad++;
        return (
          <ComBoxTareaXUnidadEstudiante key={index}
            unidad={unidadString}
            tareas={tarea}
            curso={curso}
            to={to}
          />
        );
      })}
    </div>
  );
}

VCursoEstudianteContenidoTareas.propTypes={
  to:PropTypes.string.isRequired,
  curso:PropTypes.object.isRequired,
  tareas:PropTypes.array.isRequired
}

export default VCursoEstudianteContenidoTareas;
