import { useState } from "react";
import "./TablaGestionEstudiantes.css";
import AlumnoService from "../../../../services/alumnoService";
import EditEstudianteModal from "../../Modals/EditEstudianteModal";
import ConfirmationModal from "../../Modals/ConfirmacionModal";
import PaginacionComponent from "../../../generalsComponets/PaginacionComponent/PaginacionComponent";
import PropTypes from "prop-types";
import { IconButton, Flex } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { Portal, Dialog, CloseButton } from "@chakra-ui/react";
import ConfirmCard from "../../../generalsComponets/ConfirmCard/ConfirmCard";

function TablaGestionEstudiantes({
  estudiantes,
  onStudentDeleted,
  onStudentUpdated,
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
    setShowDeleteDialog(true);
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
      setShowDeleteDialog(false);
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
            <caption className="sr-only">
              Tabla de gestion de estudiantes
            </caption>
            <thead>
              <tr>
                <th id="Dni">Dni</th>
                <th id="Nombres">Nombres</th>
                <th id="Apellidos">Apellidos</th>
                <th id="Codigo">Código</th>
                <th id="Celular">Celular</th>
                <th id="Nivel">Nivel</th>
                <th id="GradoSeccion">Grado - Sección</th>
                <th id="FechaNac">Fecha de Nacimiento</th>
                <th id="Acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((estudiante) => (
                <tr key={estudiante.usuarioId}>
                  <td headers="Dni" data-label="Dni">
                    {estudiante.dni}
                  </td>
                  <td headers="Nombres" data-label="Nombres">
                    {estudiante.nombre}
                  </td>
                  <td headers="Apellidos" data-label="Apellidos">
                    {estudiante.apellido}
                  </td>
                  <td headers="Codigo" data-label="Codigo">
                    {estudiante.codigo}
                  </td>
                  <td headers="Celular" data-label="Celular">
                    {estudiante.telefono}
                  </td>
                  <td headers="Nivel" data-label="Nivel">
                    {estudiante.nivel}
                  </td>
                  <td headers="GradoSeccion" data-label="Grado - Seccion">
                    {`${estudiante.grado} - "${estudiante.seccion}"`}
                  </td>
                  <td headers="FechaNac" data-label="Fecha de Nacimiento">
                    {estudiante.fechaNacimiento}
                  </td>
                  <td headers="Acciones" data-label="Acciones">
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
                  title={`¿Seguro que quieres eliminar al estudiante seleccionado?`}
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

TablaGestionEstudiantes.propTypes = {
  estudiantes: PropTypes.array.isRequired,
  onStudentDeleted: PropTypes.func.isRequired,
  onStudentUpdated: PropTypes.func.isRequired,
};

export default TablaGestionEstudiantes;
