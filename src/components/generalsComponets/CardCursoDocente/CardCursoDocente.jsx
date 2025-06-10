import "./CardCursoDocente.css";
import PropTypes from "prop-types";
function CardCursoDocente({ curso }) {
  return (
    <div className="CardDocenteContainer">
      <div className="ImgDocenteContainer"></div>
      <div className="ContentContainerDocente">
        <p className="PLg">{curso.Nombre}</p>
        <div className="RowContainer">
          <p className="PMd"> {curso.Docente}</p>
          <p className="PMd Nivel">{curso.Nivel}</p>
          <p className="PMd Nivel">{curso.Grado}°</p>
        </div>
      </div>
    </div>
  );
}

CardCursoDocente.propTypes={
curso:PropTypes.object.isRequired
}

export default CardCursoDocente;
