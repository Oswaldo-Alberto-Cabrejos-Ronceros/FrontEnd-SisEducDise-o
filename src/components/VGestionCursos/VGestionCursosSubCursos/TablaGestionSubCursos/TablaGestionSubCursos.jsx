import { useState } from "react";
import "./TablaGestionSubCursos.css";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";
import EditGestionCursosForm from "../../ModalsCurso/EditGestionCursosForm/EditGestionCursosForm";
import SubcursoService from "../../../../services/subcursoService";
import PropTypes from "prop-types";
import { IconButton, Flex } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { Portal, Dialog, CloseButton } from "@chakra-ui/react";
import ConfirmCard from "../../../generalsComponets/ConfirmCard/ConfirmCard";

function TablaGestionSubCursos({
  subcursos,
  onSubCursoUpdated,
  onSubCursoDeleted,
}) {
  //for dialogs
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSubcurso, setSelectedSubcurso] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEditClick = (subcurso) => {
    setSelectedSubcurso(subcurso);
    setShowEditDialog(true);
  };

  const handleDeleteClick = (subcursoId) => {
    setSelectedSubcurso(subcursoId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await SubcursoService.deleteSubcurso(selectedSubcurso);
      onSubCursoDeleted(selectedSubcurso);
      showConfirmationMessage("Subcurso eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el subcurso:", error);
      showConfirmationMessage("Error al eliminar el subcurso");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await SubcursoService.SubcursoUpdate(
        selectedSubcurso.subcursoId,
        updatedData
      );
      onSubCursoUpdated(response.data);
      showConfirmationMessage("Subcurso actualizado correctamente");
    } catch (error) {
      console.error("Error en la actualización:", error);
      if (error.response && error.response.status === 500) {
        showConfirmationMessage(
          `Ya existe un subcurso con el nombre "${updatedData.nombre}" , verifique el nivel"`
        );
      } else {
        showConfirmationMessage("Error al actualizar el subcurso");
      }
    } finally {
      setShowEditDialog(false);
    }
  };

  const showConfirmationMessage = (message, duration = 1500) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), duration);
  };

  return (
    <div className="TablaGestionSubCursosContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />

      {subcursos.length === 0 ? (
        <div className="TablaGestionSubCursosVerDocEmpty">
          <h3>No hay Subcursos registrados</h3>
        </div>
      ) : (
        <table className="TableGestionSubCursos">
                     <caption className="sr-only">
              Tabla de gestion de subcursos
            </caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Nivel</th>
              <th>Curso</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subcursos.map((subcurso) => (
              <tr key={subcurso.subcursoId}>
                <td data-label="Nombre">{subcurso.nombre}</td>
                <td data-label="Descripcion">{subcurso.descripcion}</td>
                <td data-label="Nivel">{subcurso.nivel}</td>
                <td data-label="Curso">{subcurso.curso.nombre}</td>
                <td data-label="Acciones">
                  <Flex gap="0.5rem">
                    <IconButton
                      variant="outline"
                      aria-label="Editar"
                      rounded="full"
                      colorPalette="yellow"
                      onClick={() => handleEditClick(subcurso)}
                    >
                      <GoPencil />
                    </IconButton>
                    <IconButton
                      variant="outline"
                      aria-label="Eliminar"
                      rounded="full"
                      colorPalette="red"
                      onClick={() => handleDeleteClick(subcurso.subcursoId)}
                    >
                      <MdDeleteOutline />
                    </IconButton>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Dialog.Root
        placement="center"
        motionPreset="scale"
        open={showEditDialog}
        onOpenChange={(e) => setShowEditDialog(e.open)}
        size="sm"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <EditGestionCursosForm
                  curso={selectedSubcurso}
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

      {/*dialogo de eliminacion*/}
      <Dialog.Root
        placement="center"
        motionPreset="scale"
        open={showDeleteDialog}
        onOpenChange={(e) => setShowDeleteDialog(e.open)}
        size="sm"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <ConfirmCard
                  title={`¿Estás seguro de que deseas eliminar este subcurso?`}
                  onConfirm={confirmDelete}
                  onCancel={() => setShowDeleteDialog(false)}
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

TablaGestionSubCursos.propTypes = {
  subcursos: PropTypes.array.isRequired,
  onSubCursoUpdated: PropTypes.func.isRequired,
  onSubCursoDeleted: PropTypes.func.isRequired,
};

export default TablaGestionSubCursos;
