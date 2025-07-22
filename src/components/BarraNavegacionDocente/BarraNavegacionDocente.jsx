import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./BarraNavegacionDocente.css";
import NavItem from "../generalsComponets/NavItem/NavItem";
import NavUser from "../generalsComponets/CardUser/NavUser";
import { IoBookOutline } from "react-icons/io5";
//import { FaCalendarAlt } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaRankingStar } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import PropTypes from "prop-types";
import { Menu, Portal, Box, Drawer, Flex } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IconButton } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { Dialog, CloseButton } from "@chakra-ui/react";
import ConfirmCard from "../generalsComponets/ConfirmCard/ConfirmCard";

function BarraNavegacionDocente({ nombre, apellido }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    // Limpiar sessionStorage y redirigir
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="BarraNavegacionDocenteContainer">
      <div className="HorizontalContainerBarDocente">
        <div className="MenuIconContainer" onClick={()=>setOpenDrawer(true)}>
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
                    to="/docente/usuario"
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
        <div
          className="VerticalContainerBarDocente"

        >
          <div className="MenuIconContainer" onClick={()=>setOpenDrawer(true)}>
            <IoMenu />
          </div>
          <div className="OptionsContainer">
            <NavItem
              id={"Cursos"}
              titulo={"Cursos"}
              icon={<IoBookOutline />}
              to="/docente/cursos"
            />
            {/*            <NavItem
              id={"Horario"}
              titulo={"Horario"}
              icon={<FaCalendarAlt />}
              to="horario"
            />*/}

            <NavItem
              id={"Notas"}
              titulo={"Notas"}
              icon={<GrNotes />}
              to="/docente/notas"
            />
            <NavItem
              id={"Honor"}
              titulo={"Honor"}
              icon={<FaRankingStar />}
              to="/docente/honor"
            />
            <NavItem
              id={"Informes"}
              titulo={"Informes"}
              icon={<FiTrendingUp />}
              to="/docente/informes"
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
                    to="/docente/cursos"
                    onClick={() => setOpenDrawer(false)}
                    horizontal
                  />
                  {/*            <NavItem
              id={"Horario"}
              titulo={"Horario"}
              icon={<FaCalendarAlt />}
              to="horario"
              onClick={
               () => setOpenDrawer(false)
              }
              horizontal
            />*/}

                  <NavItem
                    id={"Notas"}
                    titulo={"Notas"}
                    icon={<GrNotes />}
                    to="/docente/notas"
                    onClick={() => setOpenDrawer(false)}
                    horizontal
                  />
                  <NavItem
                    id={"Honor"}
                    titulo={"Honor"}
                    icon={<FaRankingStar />}
                    to="/docente/honor"
                    onClick={() => setOpenDrawer(false)}
                    horizontal
                  />
                  <NavItem
                    id={"Informes"}
                    titulo={"Informes"}
                    icon={<FiTrendingUp />}
                    to="/docente/informes"
                    onClick={() => setOpenDrawer(false)}
                    horizontal
                  />
                </Flex>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Backdrop>
      </Drawer.Root>

      {/*dialogo de cerrar sesion*/}
      <Dialog.Root
        placement="center"
        motionPreset="scale"
        open={showLogoutModal}
        onOpenChange={(e) => setShowLogoutModal(e.open)}
        size="sm"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <ConfirmCard
                  title={`¿Seguro que quieres cerrar sesión?`}
                  onConfirm={handleLogoutConfirm}
                  onCancel={() => setShowLogoutModal(false)}
                ></ConfirmCard>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

BarraNavegacionDocente.propTypes = {
  nombre: PropTypes.string.isRequired,
  apellido: PropTypes.string.isRequired,
};

export default BarraNavegacionDocente;
