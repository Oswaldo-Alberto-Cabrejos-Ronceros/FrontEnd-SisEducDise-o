
import "./ComBoxElementTarea.css";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ComBoxElementTarea({curso, to, tarea}) {

  return (
    <Link state={{curso,tarea}} to={to} className="LinkComBoxElementTarea">
    <div className="ComBoxElementTareaContainer">
      <div className="IconContainer">
        <SlPencil/>
      </div>
      <p className="PMd">{"Tarea: " + tarea.nombreContenido}</p>
    </div>
    </Link>
  );
}

ComBoxElementTarea.propTypes={
  curso:PropTypes.object.isRequired, to:PropTypes.string.isRequired, tarea:PropTypes.object.isRequired
}

export default ComBoxElementTarea;
