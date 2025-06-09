import "./VTareasDocentePorFecha.css";
import ComBoxElementTareaDocente from "../../generalsComponets/ComBoxElementTareaDocenteAdmin/ComBoxElementTareaDocenteAdmin";
import PropTypes from "prop-types";

function VTareasDocentePorFecha({ to, tareasPorFecha, tareas }) {
  return (
    <div className="VTareasDocentePorFechaContainer">
      <div className="VTareasDocentePorFechaTitleContainer">
        <h3>Por Fecha</h3>
      </div>
      <div className="ComBoxElementTareaDocenteContainerVTareasFecha">
        {tareas.map((tarea, index) => (
          <ComBoxElementTareaDocente key={index} tarea={tarea} to={to} curso={tareasPorFecha} />
        ))}
      </div>
    </div>
  );
}

VTareasDocentePorFecha.propTypes={
  to:PropTypes.string.isRequired,
  tareasPorFecha:PropTypes.array.isRequired,
  tareas:PropTypes.array.isRequired
}
export default VTareasDocentePorFecha;
