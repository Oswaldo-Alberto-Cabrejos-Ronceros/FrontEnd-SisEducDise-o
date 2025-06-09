import './VCursoDocenteAdministradorContenidoTareas.css'
import ComBoxTareaXUnidadDocente from '../../generalsComponets/ComBoxTareaXUnidadDocenteAdmin/ComBoxTareaXUnidadDocenteAdmin';
import PropTypes from "prop-types";

function VCursoDocenteAdministradorContenidoTareas({to, curso, tareas}) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className='VCursoDocenteContenidoTareasContainer'>
      {tareas.map((tarea,index) => {
        unidadString = unidad + numerounidad;
        numerounidad++;
        return (
          <ComBoxTareaXUnidadDocente
          key={index}
            unidad={unidadString}
            tareas={tarea}
            curso={curso}
            to={to}
          />
        );
      })}
    </div>
  )
}

VCursoDocenteAdministradorContenidoTareas.propTypes={
    to:PropTypes.string.isRequired,
    curso:PropTypes.string.isRequired,
    tareas:PropTypes.array.isRequired
}

export default VCursoDocenteAdministradorContenidoTareas