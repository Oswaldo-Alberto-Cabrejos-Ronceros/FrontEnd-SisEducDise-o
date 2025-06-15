import { useState } from "react";
import "./TablaGestionDocentes.css";
import DocenteService from "../../../../services/docenteService";
import EditDocenteModal from "../../Modals/EditDocenteModal";
import DeleteUserModal from "../../Modals/DeleteUserModal";
import ConfirmationModal from "../../Modals/ConfirmacionModal";
import PaginacionComponent from "../../../generalsComponets/PaginacionComponent/PaginacionComponent";
import PropTypes from "prop-types";
import { IconButton, Flex } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { Portal, Dialog, CloseButton } from "@chakra-ui/react";

function TablaGestionDocentes({
  docentes,
  onDocenteDeleted,
  onDocenteUpdated,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  //cambios paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const indexOfLastItem = currentPage * itemsPerPage;
  console.log(currentPage, itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = docentes.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  console.log(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

  const handleDeleteClick = (docenteId) => {
    setSelectedDocente(docenteId);
    setShowDeleteModal(true);
  };

  const handleEditClick = (docente) => {
    setSelectedDocente(docente);
    setShowEditDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await DocenteService.deleteProfesor(selectedDocente);
      onDocenteDeleted(selectedDocente);
      showConfirmationMessage("Docente eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      showConfirmationMessage("Error al eliminar el docente");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await DocenteService.AdminUpdateProfesor(
        selectedDocente.usuarioId,
        updatedData
      );
      onDocenteUpdated(response.data);
      showConfirmationMessage("Docente actualizado correctamente");
    } catch (error) {
      console.error("Error en la actualización:", error);
      showConfirmationMessage("El DNI proporcionado ya existe");
    } finally {
      setShowEditDialog(false);
    }
  };

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1700);
  };

  console.log(docentes);
  return (
    <div className="TablaGestionDocentesContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />

      {docentes.length === 0 ? (
        <div className="TablaGestionDocentesVerDocEmpty">
          <h3>No hay Docentes registrados</h3>
        </div>
      ) : (
        <div>
          <table className="TableGestionDocentes">
            <thead>
              <tr>
                <th>Dni</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Especialidad</th>
                <th>Codigo</th>
                <th>Celular</th>
                <th>Nivel</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((docente) => (
                <tr key={docente.usuarioId}>
                  <td data-label="Dni">{docente.dni}</td>
                  <td data-label="Nombres">{docente.nombre}</td>
                  <td data-label="Apellidos">{docente.apellido}</td>
                  <td data-label="Especialidad">{docente.especialidad}</td>
                  <td data-label="Codigo">{docente.codigo}</td>
                  <td data-label="Celular">{docente.telefono}</td>
                  <td data-label="Nivel">{docente.nivel}</td>
                  <td data-label="Acciones">
                    <Flex gap="0.5rem">
                      <IconButton
                        variant="outline"
                        aria-label="Editar"
                        rounded="full"
                        colorPalette="yellow"
                        onClick={() => handleEditClick(docente)}
                      >
                        <GoPencil />
                      </IconButton>
                      <IconButton
                        variant="outline"
                        aria-label="Eliminar"
                        rounded="full"
                        colorPalette="red"
                        onClick={() => handleDeleteClick(docente.usuarioId)}
                      >
                        <MdDeleteOutline />
                      </IconButton>
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginacionComponent
            totalItems={docentes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <Dialog.Root
        placement="center"
        motionPreset="scale"
        open={showEditDialog}
        onOpenChange={(e) => setShowEditDialog(e.open)}
        size="lg"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <EditDocenteModal
                  profesor={selectedDocente}
                  onUpdate={handleUpdate}
                  onClose={() => setShowEditDialog(false)}
                />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <DeleteUserModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

TablaGestionDocentes.propTypes = {
  docentes: PropTypes.array.isRequired,
  onDocenteDeleted: PropTypes.func.isRequired,
  onDocenteUpdated: PropTypes.func.isRequired,
};

export default TablaGestionDocentes;
