import { useState } from "react";
import HorarioService from "../../../../services/horarioService";
import InputComponent from "../../InputComponent/InputComponent";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import ButtonSubtmit from "../../ButtonSubmit/ButtonSubtmit";
import './SubirHorarioDocenteModal.css'
import PropTypes from "prop-types";

function SubirHorarioDocenteModal({ show, docente, onClose,onHorarioAgregado }) {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("Por favor, selecciona un archivo.");
      return;
    }

    try {
      await HorarioService.subirHorarioProfesor(docente.usuarioId, archivo);
      setMensaje("Horario subido correctamente.");
      if (onHorarioAgregado) {
        onHorarioAgregado();
      }

    } catch (error) {
      console.error(error)
      setMensaje("Error al subir el horario.");
    }
  };

  if (!show) return null;

  return (
    <div className="SubirHorarioModal">
      <div className="SubirHorarioModalContent">
        <h3>Subir Horario para {docente?.nombre} {docente?.apellido}</h3>
        <form onSubmit={handleSubmit}>
            <InputComponent type={"file"} onChange={handleFileChange}/>
            <ButtonSubtmit nombre={"Subir"}/>
        </form>
        {mensaje && <p>{mensaje}</p>}
        <PrimaryButton onClick={onClose} nombre={"Cerrar"}/>
      </div>
    </div>
  );
}

SubirHorarioDocenteModal.propTypes={
  show:PropTypes.bool.isRequired,
  docente:PropTypes.shape({
    usuarioId:PropTypes.number.isRequired,
    nombre:PropTypes.string.isRequired,
    apellido:PropTypes.string.isRequired
  }).isRequired,
  onClose:PropTypes.func.isRequired,
  onHorarioAgregado:PropTypes.func
}

export default SubirHorarioDocenteModal;