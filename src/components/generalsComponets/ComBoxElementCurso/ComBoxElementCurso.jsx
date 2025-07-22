import { IoDocumentTextOutline } from "react-icons/io5";
import "./ComBoxElementCurso.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ComBoxElementCurso({ curso, to, contenido }) {
  return (
    <Link
      state={{ curso, contenido }}
      to={to}
      className="LinkComBoxElementCurso"
    >
      <div className="ComBoxElementCursoDocContainer">
        <div className="MdContentPasteSearchContainer">
          <IoDocumentTextOutline />
        </div>
        <p className="PMd">{contenido.nombreContenido}</p>
      </div>
    </Link>
  );
}

export default ComBoxElementCurso;

ComBoxElementCurso.propTypes = {
  curso: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  contenido: PropTypes.object.isRequired,
};
