import { useState, useEffect } from "react";
import "./ComBoxCursoXUnidadDocente.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ComBoxElementCursoDocente from "../ComBoxElementCursoDocenteAdministrador/ComBoxElementCursoDocenteAdministrador";
import ComBoxElementCursoSubir from "../ComBoxElementCursoSubir/ComBoxElementCursoSubir";
import contenidosService from "../../../services/contenidosService";
import ComBoxElementTareaDocenteAdmin from "../ComBoxElementTareaDocenteAdmin/ComBoxElementTareaDocenteAdmin";
import PropTypes from "prop-types";

function ComBoxCursoXUnidadDocente({
  to,
  toTarea,
  curso,
  unidad,
  unidadNumero,
}) {
  const [contenidos, setContenidos] = useState([]);
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);
  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  useEffect(() => {
    contenidosService
      .obtenerContenidos(
        curso.Nivel,
        curso.Grado,
        curso.SubcursoId,
        unidadNumero
      )
      .then((response) => {
        setContenidos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los contenidos:", error);
        setContenidos([]);
      });
  }, [curso.Nivel, curso.Grado, curso.SubcursoId, unidadNumero]);
  const agregarContenido = (nuevoContenido) => {
    setContenidos((prevContenidos) => [...prevContenidos, nuevoContenido]);
  };

  const eliminarContenido = (id) => {
    setContenidos((prevContenidos) =>
      prevContenidos.filter((contenido) => contenido.id !== id)
    );
  };

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
          {contenidos.map((contenido, index) =>
            contenido.isTarea ? (
              <ComBoxElementTareaDocenteAdmin
                key={index}
                tarea={contenido}
                to={toTarea}
                curso={curso}
                onDelete={eliminarContenido}
              />
            ) : (
              <ComBoxElementCursoDocente
                key={index}
                contenido={contenido}
                to={to}
                curso={curso}
                onDelete={eliminarContenido}
              />
            )
          )}
          <ComBoxElementCursoSubir
            cursoinfo={curso}
            unidad={unidadNumero}
            onAgregarContenido={agregarContenido}
          />
        </div>
      )}
    </div>
  );
}

ComBoxCursoXUnidadDocente.propTypes = {
  to: PropTypes.string.isRequired,
  toTarea: PropTypes.string.isRequired,
  curso: PropTypes.object.isRequired,
  unidad: PropTypes.string.isRequired,
  unidadNumero: PropTypes.number.isRequired,
};

export default ComBoxCursoXUnidadDocente;
