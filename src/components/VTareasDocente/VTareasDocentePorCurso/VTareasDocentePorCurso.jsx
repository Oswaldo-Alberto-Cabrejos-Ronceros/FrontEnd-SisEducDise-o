import './VTareasDocentePorCurso.css'
import ComBoxTareaXUnidadDocente from '../../generalsComponets/ComBoxTareaXUnidadDocenteAdmin/ComBoxTareaXUnidadDocenteAdmin'
import PropTypes from "prop-types";

function VTareasDocentePorCurso({to, tareasCurso,tareas}) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className='VTareasDocentePorCursoContainer'>
      <div className="VTareasDocentePorCursoTitleContainer">
        <h3>Por curso</h3>
      </div>
      <div className="VTareasDocentePorCursoContent">
        {tareas.map((tarea,index) => {
          unidadString = unidad + numerounidad;
          numerounidad++;
          return (
            <ComBoxTareaXUnidadDocente key={index}
              unidad={unidadString}
              tareas={tarea}
              to={to}
              curso={tareasCurso}
            />
          );
        })}
      </div>
    </div>
  )
}

VTareasDocentePorCurso.propTypes={
  to:PropTypes.string.isRequired, tareasCurso:PropTypes.object.isRequired,tareas:PropTypes.array.isRequired
}

export default VTareasDocentePorCurso