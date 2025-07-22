import "./ComponentNotasEstudianteElement.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ComponentNotasEstudianteElement({ title, tipo, indicador }) {
  return (
    <div className="ComponentNotasEstudianteElementContainer">
      <Link
        to={`/estudiante/notas/info/${tipo}`}
        state={{ title, indicador }}
        className="LinkComponentNotasEstudianteElement"
      >
        <div className="ComponentNotasEstudianteElementContent">
          <p className="PLg">{title}</p>
        </div>
      </Link>
    </div>
  );
}

ComponentNotasEstudianteElement.propTypes = {
  title: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  indicador: PropTypes.string.isRequired,
};
export default ComponentNotasEstudianteElement;
