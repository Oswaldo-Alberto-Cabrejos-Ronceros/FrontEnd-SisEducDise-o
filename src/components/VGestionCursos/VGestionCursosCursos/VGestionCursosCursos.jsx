import { useState, useEffect } from "react";
import "./VGestionCursosCursos.css";
import TablaGestionCursos from "./TablaGestionCursos/TablaGestionCursos";
import FormularioAgregarCurso from "./FormularioAgregarCurso/FormularioAgregarCurso";
import CursoService from "../../../services/cursosService";
import { Button, Portal, Dialog, CloseButton } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";

function VGestionCursosCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //For dialog

  const [openDialogAddCourse, setOpenDialogAddCourse] = useState(false);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await CursoService.getAllCursos();
      setCursos(response.data);
    } catch (error) {
      setError("Error al cargar cursos. Inténtalo más tarde.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar curso en vivo
  const handleCourseUpdated = (updatedCurso) => {
    setCursos((prevCursos) =>
      prevCursos.map((curso) =>
        curso.cursoId === updatedCurso.cursoId ? updatedCurso : curso
      )
    );
  };
  // Eliminar estudiante en vivo
  const handleCourseDeleted = (deletedId) => {
    setCursos((prevCursos) =>
      prevCursos.filter((curso) => curso.cursoId !== deletedId)
    );
  };

  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VGestionCursosCursosContainer">
      <div className="VGestionCursosCursosContainerTitle">
        <h3>Cursos</h3>
        {/*boton agregar estudiante*/}
        <Button
          colorPalette="red"
          rounded="lg"
          variant="outline"
          ml="auto"
          onClick={() => setOpenDialogAddCourse(true)}
        >
          Agregar <IoIosAddCircleOutline />
        </Button>
      </div>
      <div className="VGestionCursosContent">
        <TablaGestionCursos
          cursos={cursos}
          onCourseUpdated={handleCourseUpdated}
          onCourseDeleted={handleCourseDeleted}
        />
      </div>

      <Dialog.Root
        placement="center"
        motionPreset="scale"
        open={openDialogAddCourse}
        onOpenChange={(e) => setOpenDialogAddCourse(e.open)}
        size="lg"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <FormularioAgregarCurso onCourseAdded={fetchCursos} />
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

export default VGestionCursosCursos;
