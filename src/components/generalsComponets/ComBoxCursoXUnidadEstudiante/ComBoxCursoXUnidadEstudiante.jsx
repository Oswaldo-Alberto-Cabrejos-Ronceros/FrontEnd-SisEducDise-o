import { useState, useEffect } from "react";
import "./ComBoxCursoXUnidadEstudiante.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ComBoxElementCurso from "../ComBoxElementCurso/ComBoxElementCurso";
import contenidosService from "../../../services/contenidosService";
import ComBoxElementTarea from "../ComBoxElementTarea/ComBoxElementTarea";
import PropTypes from "prop-types";

function ComBoxCursoXUnidadEstudiante({
  to,
  toTarea,
  curso,
  unidad,
  unidadNumero,
  grado,
}) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);
  const [contenidos, setContenidos] = useState([]);
  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };

  useEffect(() => {
    contenidosService
      .obtenerContenidos(curso.Nivel, grado, curso.SubcursoId, unidadNumero)
      .then((response) => {
        setContenidos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los contenidos:", error);
        setContenidos([]);
      });
  });


  return (
    <div className="ComBoxGeneralContainer">
      <button className="ComBoxCursoXUnidadContainer" onClick={handleClick}>
        <p className="PLg">{unidad}</p>
        <div className="ArrowContainer">
          {mostrarOtroComponente ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </button>
      {mostrarOtroComponente && (
        <div className="ComBoxElementContainer">
          {contenidos.length === 0 ? (
            <h4>No hay contenido subido</h4>
          ) : (
            contenidos.map((contenido, index) =>
              contenido.isTarea ? (
                <ComBoxElementTarea
                  key={index}
                  tarea={contenido}
                  to={toTarea}
                  curso={curso}
                />
              ) : (
                <ComBoxElementCurso
                  key={index}
                  contenido={contenido}
                  to={to}
                  curso={curso}
                />
              )
            )
          )}
        </div>
      )}
    </div>
  );
}

ComBoxCursoXUnidadEstudiante.propTypes={
    to:PropTypes.string.isRequired,
  toTarea:PropTypes.string.isRequired,
  curso:PropTypes.object.isRequired,
  unidad:PropTypes.string.isRequired,
  unidadNumero:PropTypes.number.isRequired,
  grado:PropTypes.number.isRequired,
}

export default ComBoxCursoXUnidadEstudiante;
