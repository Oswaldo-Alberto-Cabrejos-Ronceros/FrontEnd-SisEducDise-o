import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./BarraNavegacionEstudiante.css";
import NavItem from "../generalsComponets/NavItem/NavItem";
import { IoBookOutline } from "react-icons/io5";
//import { FaCalendarAlt } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import NavUser from "../generalsComponets/CardUser/NavUser";
import { FaRankingStar } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import PropTypes from "prop-types";
import { Menu, Portal, Box } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function BarraNavegacionEstudiante({ nombre, apellido }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal
  const [showMenu, setShowMenu] = useState(window.innerWidth > 1130);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    // Limpiar sessionStorage y redirigir
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth > 1130); // Mostrar menú automáticamente en pantallas grandes
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const setShowMenuFalse = () => {
    setShowMenu(false);
  };

  return (
    <div className="BarraNavegacionEstudianteContainer">
      <div className="HorizontalContainer">
        <div className="MenuIconContainer" onClick={handleShowMenu}>
          <IoMenu />
        </div>
        <div className="MenuRightContainer">
          <Menu.Root positioning={{ placement: "bottom-end" }}>
            <Menu.Trigger>
              <NavUser
                nombre={apellido + ", " + nombre}
                imagen={
                  "https://dashboard.rtta.rw/public/assets/img/avatar.png"
                }
              />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {/*para perfil*/}
                  <Menu.Item
                    cursor="pointer"
                    value="0"
                    as={NavLink}
                    to="/estudiante/usuario"
                  >
                    <Box flex="1"> Ver perfil</Box>
                    <FaRegUser />
                  </Menu.Item>
                  {/*para cerrar sesion*/}
                  <Menu.Item
                    cursor="pointer"
                    value="1"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    <Box flex="1"> Cerrar sesión</Box>
                    <IoIosLogOut />
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </div>
      </div>
      {showMenu ? (
        <div className={`VerticalContainer ${showMenu ? "show" : "hide"}`}>
          <div className="OptionsContainer">
            <div className="MenuIconContainer">
              <IoMenu />
            </div>
            <NavItem
              id={"Cursos"}
              titulo={"Cursos"}
              icon={<IoBookOutline />}
              to="/estudiante/cursos"
              onClick={
                window.innerWidth > 1130 === true ? null : setShowMenuFalse
              }
            />
            {/*            <NavItem
              id={"Horario"}
              titulo={"Horario"}
              icon={<FaCalendarAlt />}
              to="horario"
              onClick={window.innerWidth > 1130===true?(null):(setShowMenuFalse)}
            />*/}

            <NavItem
              id={"Notas"}
              titulo={"Notas"}
              icon={<GrNotes />}
              to="/estudiante/notas"
              onClick={
                window.innerWidth > 1130 === true ? null : setShowMenuFalse
              }
            />
            <NavItem
              id={"Honor"}
              titulo={"Honor"}
              icon={<FaRankingStar />}
              to="/estudiante/honor"
              onClick={
                window.innerWidth > 1130 === true ? null : setShowMenuFalse
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="LogoutModalOverlay">
          <div className="LogoutModalContent">
            <h3>¿Estás seguro de cerrar la sesión?</h3>
            <div className="LogoutModalButtons">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="LogoutButtonNo"
              >
                No
              </button>
              <button onClick={handleLogoutConfirm} className="LogoutButtonYes">
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

BarraNavegacionEstudiante.propTypes = {
  nombre: PropTypes.string.isRequired,
  apellido: PropTypes.string.isRequired,
};

export default BarraNavegacionEstudiante;
