import "./CardCursoEstudiante.css";
import PropTypes from "prop-types";

function CardCursoEstudiante({ curso }) {
  return (
    <div className="CardContainer">
      <div className="ImgContainer"></div>
      <div className="ContentContainer">
        <p className="PLg">{curso.Nombre}</p>
        <div className="RowContainer">
          <p className="PMd">Doc: {curso.Docente}</p>
          <p className="PMd Nivel">{curso.Nivel}</p>
        </div>
      </div>
    </div>
  );
}

CardCursoEstudiante.propTypes={
  curso:PropTypes.shape({
    Nombre:PropTypes.string.isRequired,
    Docente:PropTypes.string.isRequired,
    Nivel:PropTypes.string.isRequired
  }).isRequired
}

export default CardCursoEstudiante;
