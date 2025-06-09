import "./VTareasAdministradorPorCurso.css";
import ComBoxTareaXUnidadAdmin from "../../generalsComponets/ComBoxTareaXUnidadDocenteAdmin/ComBoxTareaXUnidadDocenteAdmin";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import PropTypes from "prop-types";

function VTareasAdministradorPorCurso({ to, tareasCurso, tareas }) {
  let optionsNivel = ["Primaria", "Secundaria"];
  let optionsGrado = [
    "1er Grado",
    "2do Grado",
    "3er Grado",
    "4to Grado",
    "5to Grado",
    "6to Grado",
  ];
  let optionsSeccion = ["Unica", "A", "B"];
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className="VTareasAdministradorPorCursoContainer">
      <div className="VTareasAdministradorPorCursoTitleContainer">
        <h3>Por curso</h3>
      </div>
      <div className="SelectTareasAdministradorPorCursoGeneralContainer">
        <div className="SelectTareasAdministradorPorCursoContainer">
          <SelectComponent name={"Nivel"} options={optionsNivel} />
          <SelectComponent name={"Grado"} options={optionsGrado} />
          <SelectComponent name={"Seccion"} options={optionsSeccion} />
        </div>
      </div>
      <div className="VTareasAdministradorPorCursoContent">
        {tareas.map((tarea, index) => {
          unidadString = unidad + numerounidad;
          numerounidad++;
          return (
            <ComBoxTareaXUnidadAdmin
              key={index}
              unidad={unidadString}
              tareas={tarea}
              to={to}
              tareasCurso={tareasCurso}
            />
          );
        })}
      </div>
    </div>
  );
}

VTareasAdministradorPorCurso.propTypes = {
  to: PropTypes.string.isRequired,
  tareasCurso: PropTypes.object.isRequired,
  tareas: PropTypes.array.isRequired,
};

export default VTareasAdministradorPorCurso;
