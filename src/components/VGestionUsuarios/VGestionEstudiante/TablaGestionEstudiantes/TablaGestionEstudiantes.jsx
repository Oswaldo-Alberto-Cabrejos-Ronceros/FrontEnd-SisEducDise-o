import { useState } from "react";
import "./TablaGestionEstudiantes.css";
import AlumnoService from "../../../../services/alumnoService";
import EditEstudianteModal from "../../Modals/EditEstudianteModal";
import DeleteUserModal from "../../Modals/DeleteUserModal";
import ConfirmationModal from "../../Modals/ConfirmacionModal";
import PaginacionComponent from "../../../generalsComponets/PaginacionComponent/PaginacionComponent";
import PropTypes from "prop-types";
import { IconButton, Flex } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { Portal, Dialog, CloseButton } from "@chakra-ui/react";

function TablaGestionEstudiantes({
  estudiantes,
  onStudentDeleted,
  onStudentUpdated,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  //cambios paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = estudiantes.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (estudianteId) => {
    setSelectedStudent(estudianteId);
    setShowDeleteModal(true);
  };

  const handleEditClick = (estudiante) => {
    setSelectedStudent(estudiante);
    setShowEditDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await AlumnoService.deleteAlumno(selectedStudent);
      onStudentDeleted(selectedStudent);
      showConfirmationMessage("Alumno eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error); // Asegúrate de ver el error en consola
      showConfirmationMessage("Error al eliminar el alumno");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await AlumnoService.AdminUpdateAlumno(
        selectedStudent.usuarioId,
        updatedData
      );
      onStudentUpdated(response.data); // Actualizar en la lista de estudiantes
      showConfirmationMessage("Alumno actualizado correctamente");
    } catch (error) {
      console.error("Error en la actualización:", error); // Verificar en consola el error
      showConfirmationMessage("El DNI proporcionado ya existe"); // Mensaje de error
    } finally {
      setShowEditDialog(false);
    }
  };

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1700);
  };

  return (
    <div className="TablaGestionEstudiantesContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />

      {estudiantes.length === 0 ? (
        <div className="TablaGestionEstudianteVerDocEmpty">
          <h3>No hay Alumnos registrados</h3>
        </div>
      ) : (
        <div>
          <table className="TableGestionEstudiante">
            <thead>
              <tr>
                <th>Dni</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Codigo</th>
                <th>Celular</th>
                <th>Nivel</th>
                <th>Grado - Seccion</th>
                <th>FechaNac</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((estudiante) => (
                <tr key={estudiante.usuarioId}>
                  <td data-label="Dni">{estudiante.dni}</td>
                  <td data-label="Nombres">{estudiante.nombre}</td>
                  <td data-label="Apellidos">{estudiante.apellido}</td>
                  <td data-label="Codigo">{estudiante.codigo}</td>
                  <td data-label="Celular">{estudiante.telefono}</td>
                  <td data-label="Nivel">{estudiante.nivel}</td>
                  <td data-label="Grado - Seccion">{`${estudiante.grado} - "${estudiante.seccion}"`}</td>
                  <td data-label="Fecha de Nacimiento">
                    {estudiante.fechaNacimiento}
                  </td>
                  <td data-label="Acciones">
                    <Flex gap="0.5rem">
                      <IconButton
                        variant="outline"
                        aria-label="Editar"
                        rounded="full"
                        colorPalette="yellow"
                        onClick={() => handleEditClick(estudiante)}
                      >
                        <GoPencil />
                      </IconButton>
                      <IconButton
                        variant="outline"
                        aria-label="Eliminar"
                        rounded="full"
                        colorPalette="red"
                        onClick={() => handleDeleteClick(estudiante.usuarioId)}
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
            totalItems={estudiantes.length}
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
                <EditEstudianteModal
                  student={selectedStudent}
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

TablaGestionEstudiantes.propTypes = {
  estudiantes: PropTypes.array.isRequired,
  onStudentDeleted: PropTypes.func.isRequired,
  onStudentUpdated: PropTypes.func.isRequired,
};

export default TablaGestionEstudiantes;
