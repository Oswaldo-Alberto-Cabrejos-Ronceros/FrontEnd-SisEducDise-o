import "./VCursosDocenteAdministradorContenidoContenido.css";
import ComBoxCursoXUnidadDocente from "../../generalsComponets/ComBoxCursoXUnidadDocente/ComBoxCursoXUnidadDocente";
import PropTypes from "prop-types";

function VCursosDocenteAdministradorContenidoContenido({to,toTarea,curso }) {
  let unidadString = "Unidad ";
  const unidades=[1,2,3,4,5,6,7,8];
  return (
    <div className="VCursoDocenteContenidoContenidoContainer">
      {unidades.map((unidad,index) => {
        return (
          <ComBoxCursoXUnidadDocente key={index}
            unidad={unidadString + unidad}
            curso={curso}
            to={to}
            toTarea={toTarea}
            unidadNumero={unidad}
          />
        );
      })}
    </div>
  );
}

VCursosDocenteAdministradorContenidoContenido.propTypes={
    to:PropTypes.string.isRequired,
    toTarea:PropTypes.string.isRequired,
    curso:PropTypes.object.isRequired
}

export default VCursosDocenteAdministradorContenidoContenido;