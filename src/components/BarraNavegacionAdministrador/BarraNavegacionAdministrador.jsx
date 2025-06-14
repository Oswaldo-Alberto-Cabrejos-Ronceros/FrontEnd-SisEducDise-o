import { useState, useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import "./BarraNavegacionAdministrador.css";
import NavItem from "../generalsComponets/NavItem/NavItem";
import NavUser from "../generalsComponets/CardUser/NavUser";
import { IoBookOutline } from "react-icons/io5";
//import { FaCalendarAlt } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaRankingStar } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import { TbUserEdit } from "react-icons/tb";
import { GoPencil } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import { Menu, Portal, Box } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function BarraNavegacionAdministrador() {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal
  const [showMenu, setShowMenu] = useState(window.innerWidth > 1083);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    // Limpiar sessionStorage y redirigir
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth > 1083); // Mostrar menú automáticamente en pantallas grandes
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
    <div className="BarraNavegacionAdministradorContainer">
      <div className="HorizontalContainerBarAdministrador">
        <div className="MenuIconContainer" onClick={handleShowMenu}>
          <IoMenu />
        </div>
        <div className="MenuRightContainer">
          <Menu.Root positioning={{ placement: "bottom-end" }}>
            <Menu.Trigger>
              <NavUser
                nombre={"Admin"}
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
                    to="/administrador/usuario"
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
        <div
          className={`VerticalContainerBarAdmin ${showMenu ? "show" : "hide"}`}
        >
          <div className="MenuIconContainer">
            <IoMenu />
          </div>
          <div className="OptionsContainer">
            <NavItem
              id={"Cursos"}
              titulo={"Cursos"}
              icon={<IoBookOutline />}
              to="/administrador/cursos"
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
              to="/administrador/notas"
              onClick={
                window.innerWidth > 1130 === true ? null : setShowMenuFalse
              }
            />
            <NavItem
              id={"Usuarios"}
              titulo={"Usuarios"}
              icon={<TbUserEdit />}
              to="/administrador/gestionusuarios"
              onClick={
                window.innerWidth > 1130 === true ? null : setShowMenuFalse
              }
            />
            <NavItem
              id={"GestionCursos"}
              titulo={"Gestión Cursos"}
              icon={<GoPencil />}
              to="/administrador/gestioncursos"
              onClick={
                window.innerWidth > 1130 === true ? null : setShowMenuFalse
              }
            />
            <NavItem
              id={"Honor"}
              titulo={"Honor"}
              icon={<FaRankingStar />}
              to="/administrador/honor"
              onClick={
                window.innerWidth > 1130 === true ? null : setShowMenuFalse
              }
            />
            <NavItem
              id={"Informes"}
              titulo={"Informes"}
              icon={<FiTrendingUp />}
              to="/administrador/informes"
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

export default BarraNavegacionAdministrador;
