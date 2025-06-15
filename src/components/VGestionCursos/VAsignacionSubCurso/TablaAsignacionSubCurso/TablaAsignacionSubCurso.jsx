import { useState, useEffect } from "react";
import AsignarDocenteForm from "../../ModalsCurso/AsignarDocenteForm/AsignarDocenteForm";
import EliminarAsignacionModal from "../../ModalsCurso/EliminarAsignacionModal/EliminarAsignacionModal";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import DocenteService from "../../../../services/docenteService";
import "./TablaAsignacionSubCurso.css";
import PropTypes from "prop-types";
import { IconButton, Flex } from "@chakra-ui/react";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Portal, Dialog, CloseButton } from "@chakra-ui/react";

function TablaAsignacionSubCurso({
  docentes = [],
  onDocenteUpdated,
  onShowConfirmation,
}) {
  const [showAsignarDialog, setShowAsignarDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [selectedAsignacionId, setSelectedAsignacionId] = useState(null);
  const [selectedSubcursoId, setSelectedSubcursoId] = useState({});
  const [asignaciones, setAsignaciones] = useState({});
  const [deleteMessage, setDeleteMessage] = useState(""); // Estado para el mensaje de eliminación

  const handleEditClick = (docente) => {
    setSelectedDocente(docente);
    setShowAsignarDialog(true);
  };

  const handleDeleteClick = (docenteId) => {
    const subcursoId = selectedSubcursoId[docenteId];
    const asignacion = Array.isArray(asignaciones[docenteId])
      ? asignaciones[docenteId].find(
          (asignacion) => asignacion.subcurso.subcursoId === Number(subcursoId)
        )
      : null;

    if (asignacion) {
      setSelectedAsignacionId(asignacion.asignacionProfesorId);
      setSelectedDocente(docentes.find((doc) => doc.usuarioId === docenteId));

      // Configurar mensaje personalizado
      setDeleteMessage(
        `¿Estás seguro de que deseas eliminar la asignación del subcurso "${asignacion.subcurso.nombre}"?`
      );
      setShowDeleteModal(true);
    } else {
      onShowConfirmation("Por favor, selecciona un subcurso válido.");
    }
  };

  const confirmDelete = async () => {
    try {
      await DocenteService.desasignarProfesor(selectedAsignacionId);
      onShowConfirmation("Asignación eliminada correctamente");

      // Actualizar asignaciones en el estado
      setAsignaciones((prev) => {
        const updated = { ...prev };
        updated[selectedDocente.usuarioId] = updated[
          selectedDocente.usuarioId
        ].filter(
          (asignacion) =>
            asignacion.asignacionProfesorId !== selectedAsignacionId
        );
        return updated;
      });

      // Restablecer el subcurso seleccionado
      setSelectedSubcursoId((prev) => {
        const updated = { ...prev };
        const remainingAsignaciones = asignaciones[
          selectedDocente.usuarioId
        ]?.filter(
          (asignacion) =>
            asignacion.asignacionProfesorId !== selectedAsignacionId
        );
        updated[selectedDocente.usuarioId] =
          remainingAsignaciones?.[0]?.subcurso?.subcursoId || "";
        return updated;
      });

      onDocenteUpdated();
    } catch (error) {
      console.error("Error al eliminar la asignación:", error);
      const errorMessage =
        error.response?.data || "Error al eliminar la asignación";
      onShowConfirmation(errorMessage.toString());
    } finally {
      setShowDeleteModal(false);
    }
  };

  const fetchAsignacionesIniciales = async () => {
    try {
      const asignacionesMap = {};
      const subcursoSeleccionado = {};
      for (const docente of docentes) {
        const response = await DocenteService.obtenerAsignacionesPorProfesor(
          docente.usuarioId
        );
        asignacionesMap[docente.usuarioId] = Array.isArray(response.data)
          ? response.data
          : [];

        // Establecer el primer subcurso como seleccionado inicialmente
        if (response.data.length > 0) {
          subcursoSeleccionado[docente.usuarioId] =
            response.data[0].subcurso.subcursoId;
        } else {
          subcursoSeleccionado[docente.usuarioId] = "";
        }
      }
      setAsignaciones(asignacionesMap);
      setSelectedSubcursoId(subcursoSeleccionado);
    } catch (error) {
      console.error("Error al cargar asignaciones iniciales:", error);
    }
  };

  useEffect(() => {
    fetchAsignacionesIniciales();
  }, [docentes]);

  const handleSelectChange = (docenteId, subcursoId) => {
    setSelectedSubcursoId((prev) => ({
      ...prev,
      [docenteId]: Number(subcursoId),
    }));
  };

  return (
    <div className="TablaAsignacionSubCursoContainer">
      {docentes.length === 0 ? (
        <div className="TablaAsignacionSubCursoEmpty">
          <h3>No hay docentes registrados</h3>
        </div>
      ) : (
        <table className="TableGestionAsignacionSubCursos">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Nivel</th>
              <th>Especialidad</th>
              <th>Cursos Asignados</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {docentes.map((docente) => (
              <tr key={docente.usuarioId}>
                <td data-label="Nombre">{docente.nombre}</td>
                <td data-label="Apellido">{docente.apellido}</td>
                <td data-label="Nivel">{docente.nivel}</td>
                <td data-label="Especialidad">{docente.especialidad}</td>
                <td data-label="Subcursos ">
                  <SelectComponent
                    name={`subcursos-${docente.usuarioId}`}
                    options={(asignaciones[docente.usuarioId] || []).map(
                      (asignacion) => ({
                        label: asignacion.subcurso.nombre,
                        value: asignacion.subcurso.subcursoId,
                      })
                    )}
                    value={selectedSubcursoId[docente.usuarioId] || ""}
                    onChange={(e) =>
                      handleSelectChange(docente.usuarioId, e.target.value)
                    }
                  />
                </td>
                <td data-label="Estado">
                  {Array.isArray(asignaciones[docente.usuarioId]) &&
                  asignaciones[docente.usuarioId].find(
                    (asignacion) =>
                      asignacion.subcurso.subcursoId ===
                      Number(selectedSubcursoId[docente.usuarioId])
                  )?.estado
                    ? asignaciones[docente.usuarioId].find(
                        (asignacion) =>
                          asignacion.subcurso.subcursoId ===
                          Number(selectedSubcursoId[docente.usuarioId])
                      )?.estado
                    : "No asignado"}
                </td>
                <td data-label="Acciones">
                  <Flex gap="0.5rem">
                    <IconButton
                      variant="outline"
                      aria-label="Editar"
                      rounded="full"
                      colorPalette="teal"
                      onClick={() => handleEditClick(docente)}
                    >
                      <MdOutlineAssignmentInd />
                    </IconButton>

                    {Array.isArray(asignaciones[docente.usuarioId]) &&
                      asignaciones[docente.usuarioId].length > 0 && (
                        <IconButton
                          variant="outline"
                          aria-label="Eliminar"
                          rounded="full"
                          colorPalette="red"
                          onClick={() => handleDeleteClick(docente.usuarioId)}
                        >
                          <MdDeleteOutline />
                        </IconButton>
                      )}
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
        open={showAsignarDialog}
        onOpenChange={(e) => setShowAsignarDialog(e.open)}
        size="lg"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <AsignarDocenteForm
                  docente={selectedDocente}
                  onClose={() => setShowAsignarDialog(false)}
                  onDocenteUpdated={onDocenteUpdated}
                  onShowConfirmation={onShowConfirmation}
                />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <EliminarAsignacionModal
        show={showDeleteModal}
        message={deleteMessage} // Pasar el mensaje personalizado
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

TablaAsignacionSubCurso.propTypes = {
  docentes: PropTypes.array,
  onDocenteUpdated: PropTypes.func.isRequired,
  onShowConfirmation: PropTypes.func.isRequired,
};

export default TablaAsignacionSubCurso;
