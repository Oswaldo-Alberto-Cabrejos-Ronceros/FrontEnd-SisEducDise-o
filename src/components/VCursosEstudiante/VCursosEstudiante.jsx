import PropTypes from "prop-types";
import "./VCursosEstudiante.css";
import CardCursoEstudiante from "../generalsComponets/CardCursoEstudiante/CardCursoEstudiante";
import { Link } from "react-router-dom";

function VCursosEstudiante({ cursos }) {
  return (
    <div className="CursosEstudianteContainer">
      <div className="VCursosEstudianteTitle">
        <h3>Mis cursos</h3>
      </div>
      <div className="VCursosEstudianteElementsContainer">
        {cursos.length === 0 ? (
          <h2>Sin cursos asignados</h2>
        ) : (
          cursos.map((curso, index) => (
            <div className="VCursosEstudianteElementContent" key={index}>
              <Link
                className="LinkCursoCardEstudiante"
                to="/estudiante/curso"
                state={{ curso }}
              >
                <CardCursoEstudiante curso={curso} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

VCursosEstudiante.propTypes = {
  cursos: PropTypes.array.isRequired,
};

export default VCursosEstudiante;
