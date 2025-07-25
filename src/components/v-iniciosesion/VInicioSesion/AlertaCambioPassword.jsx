import { useNavigate } from "react-router-dom";
import "./AlertaCambioPassword.css";
import PropTypes from "prop-types";

function AlertaCambioPassword({ mostrar,rol }) {
    const navigate = useNavigate();


    if (!mostrar) return null; // No mostrar nada si no debe estar visible

    let ruta;
    if(rol==="ADMIN"){
        ruta="/administrador/usuario?edit=true";
    } else if(rol==="PROFESOR"){
        ruta="/docente/usuario?edit=true";
    } else if(rol==="STUDENT"){
        ruta="/estudiante/usuario?edit=true";
    }

    return (
        <div className="alerta-cambio-password">
            <div className="alerta-header">
                <span className="alerta-icono">⚠️</span>
                <strong>¡Atención!</strong>
            </div>
            <p>
                Por motivos de seguridad, debes cambiar tu contraseña inmediatamente.
            </p>
            <button onClick={() => navigate(ruta,
                {
                    state:{
                        cambioContraseña:true,
                    },
                }
            )}>
                Cambiar ahora
            </button>
        </div>
    );
}

AlertaCambioPassword.propTypes={
    mostrar:PropTypes.bool.isRequired,
    rol:PropTypes.string.isRequired
}

export default AlertaCambioPassword;
