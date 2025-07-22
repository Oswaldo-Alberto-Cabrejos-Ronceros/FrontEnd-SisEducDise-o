import { useState } from "react";
import "./TablaGestionCursos.css";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";
import EditGestionCursosForm from "../../ModalsCurso/EditGestionCursosForm/EditGestionCursosForm"; //
import CursoService from "../../../../services/cursosService";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import PropTypes from "prop-types";
import { IconButton, Flex } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { Portal, Dialog, CloseButton } from "@chakra-ui/react";
import ConfirmCard from "../../../generalsComponets/ConfirmCard/ConfirmCard";

function TablaGestionCursos({ cursos, onCourseUpdated, onCourseDeleted }) {
  //for dialogs
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedSubcursos, setSelectedSubcursos] = useState({});

  const handleEditClick = (curso) => {
    setSelectedCurso(curso);
    setShowEditDialog(true);
  };

  const handleDeleteClick = (cursoId) => {
    setSelectedCurso(cursoId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await CursoService.deleteCurso(selectedCurso);
      onCourseDeleted(selectedCurso);
      showConfirmationMessage("Curso eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      showConfirmationMessage("Error al eliminar el curso");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await CursoService.updateCurso(
        selectedCurso.cursoId,
        updatedData
      );
      onCourseUpdated(response.data); // Usa onCourseUpdated para actualizar el curso específico
      showConfirmationMessage("Curso actualizado correctamente");
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

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1700);
  };

  const handleSubcursoSelect = (cursoId, subcursoId) => {
    setSelectedSubcursos((prevSelections) => ({
      ...prevSelections,
      [cursoId]: subcursoId,
    }));
  };

  return (
    <div className="TablaGestionCursosContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />

      {cursos.length === 0 ? (
        <div className="TablaGestionCursosVerDocEmpty">
          <h3>No hay Cursos registrados</h3>
        </div>
      ) : (
        <table className="TableGestionCursos">
                     <caption className="sr-only">
              Tabla de gestion cursos
            </caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Nivel</th>
              <th>SubCursos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.cursoId}>
                {" "}
                {/* Clave única aquí */}
                <td data-label="Nombre">{curso.nombre}</td>
                <td data-label="Descripcion">{curso.descripcion}</td>
                <td data-label="Nivel">{curso.nivel}</td>
                <td data-label="Subcursos">
                  <SelectComponent
                    name={`subcursos-${curso.cursoId}`}
                    options={
                      curso.subcursos && curso.subcursos.length > 0
                        ? curso.subcursos.map((subcurso) => ({
                            label: subcurso.nombre,
                            value: subcurso.subcursoId,
                            key: subcurso.subcursoId, // Clave única aquí
                          }))
                        : [{ label: "Sin subcursos", value: "" }]
                    }
                    value={selectedSubcursos[curso.cursoId] || ""}
                    onChange={(e) =>
                      handleSubcursoSelect(curso.cursoId, e.target.value)
                    }
                  />
                </td>
                <td data-label="Acciones">
                  <Flex gap="0.5rem">
                    <IconButton
                      variant="outline"
                      aria-label="Editar"
                      rounded="full"
                      colorPalette="yellow"
                      onClick={() => handleEditClick(curso)}
                    >
                      <GoPencil />
                    </IconButton>
                    <IconButton
                      variant="outline"
                      aria-label="Eliminar"
                      rounded="full"
                      colorPalette="red"
                      onClick={() => handleDeleteClick(curso.cursoId)}
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
                  curso={selectedCurso}
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
                  title={`¿Estás seguro de que deseas eliminar este curso?`}
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

TablaGestionCursos.propTypes = {
  cursos: PropTypes.array.isRequired,
  onCourseUpdated: PropTypes.func.isRequired,
  onCourseDeleted: PropTypes.func.isRequired,
};

export default TablaGestionCursos;
