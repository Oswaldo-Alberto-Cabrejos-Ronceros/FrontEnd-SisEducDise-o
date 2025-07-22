import './ComBoxTareaXUnidadDocenteAdmin.css'
import { useState } from "react";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import ComBoxElementTareaDocenteAdmin from '../ComBoxElementTareaDocenteAdmin/ComBoxElementTareaDocenteAdmin';
import ComBoxElementTareaSubir from '../ComBoxElementTareaSubir/ComBoxElementTareaSubir';
import PropTypes from "prop-types";

function ComBoxTareaXUnidadDocenteAdmin({to, curso, unidad,tareas}) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  return (
    <div className='ComBoxTareaXUnidadDocenteAdminContainer'>
          <div className="ComBoxTareaXUnidadSubContainer" onClick={handleClick}>
      <p className="PLg">{unidad}</p>
      <div className="ArrowContainerTarea">
      {mostrarOtroComponente ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </div>
    {mostrarOtroComponente && (
        <div className="ComBoxElementTareaUnitaryContainer">
          {tareas.map((tarea, index) => (
            <ComBoxElementTareaDocenteAdmin key={index} tarea={tarea} to={to} curso={curso}/>
          ))}
          <ComBoxElementTareaSubir/>
        </div>
      )}
    </div>
  )
}

ComBoxTareaXUnidadDocenteAdmin.propTypes={
  to:PropTypes.string.isRequired,
  curso:PropTypes.object.isRequired,
  unidad:PropTypes.string.isRequired,
  tareas:PropTypes.array.isRequired
}

export default ComBoxTareaXUnidadDocenteAdmin