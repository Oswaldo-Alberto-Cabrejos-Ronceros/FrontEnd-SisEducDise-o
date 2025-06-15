import { useState } from "react";
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
import { Menu, Portal, Box, Drawer, Flex } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IconButton } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";

function BarraNavegacionEstudiante({ nombre, apellido }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    // Limpiar sessionStorage y redirigir
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="BarraNavegacionEstudianteContainer">
      <div className="HorizontalContainer">
        <div className="MenuIconContainer" onClick={() => setOpenDrawer(true)}>
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
      <div className="VerticalContainer">
        <div className="OptionsContainer">
          <div
            className="MenuIconContainer"
            onClick={() => setOpenDrawer(true)}
          >
            <IoMenu />
          </div>
          <NavItem
            id={"Cursos"}
            titulo={"Cursos"}
            icon={<IoBookOutline />}
            to="/estudiante/cursos"
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
          />
          <NavItem
            id={"Honor"}
            titulo={"Honor"}
            icon={<FaRankingStar />}
            to="/estudiante/honor"
          />
        </div>
      </div>

      {/*Drawer*/}
      <Drawer.Root
        open={openDrawer}
        placement="start"
        onOpenChange={(e) => setOpenDrawer(e.open)}
      >
        <Drawer.Backdrop>
          <Drawer.Positioner>
            <Drawer.Content bgColor={"red.600"}>
              <Drawer.Body padding="0">
                <Flex flexDirection={"column"}>
                  <Flex
                    paddingLeft={"1.5rem"}
                    alignItems="center"
                    height="4rem"
                  >
                    <IconButton
                      aria-label="Ocultar Drawer"
                      onClick={() => setOpenDrawer(false)}
                      rounded="full"
                      bg="red.500"
                      size="lg"
                    >
                      <IoMdArrowBack />
                    </IconButton>
                  </Flex>
                  <NavItem
                    id={"Cursos"}
                    titulo={"Cursos"}
                    icon={<IoBookOutline />}
                    to="/estudiante/cursos"
                    onClick={() => setOpenDrawer(false)}
                    horizontal
                  />
                  {/*            <NavItem
              id={"Horario"}
              titulo={"Horario"}
              icon={<FaCalendarAlt />}
              to="horario"
                    onClick={
                      ()=>setOpenDrawer(false)
                    }
                    horizontal
            />*/}

                  <NavItem
                    id={"Notas"}
                    titulo={"Notas"}
                    icon={<GrNotes />}
                    to="/estudiante/notas"
                    onClick={() => setOpenDrawer(false)}
                    horizontal
                  />
                  <NavItem
                    id={"Honor"}
                    titulo={"Honor"}
                    icon={<FaRankingStar />}
                    to="/estudiante/honor"
                    onClick={() => setOpenDrawer(false)}
                    horizontal
                  />
                </Flex>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Backdrop>
      </Drawer.Root>

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
