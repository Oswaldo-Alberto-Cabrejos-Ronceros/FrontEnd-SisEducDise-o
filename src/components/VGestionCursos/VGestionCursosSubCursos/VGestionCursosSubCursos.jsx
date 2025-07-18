import { useState, useEffect } from "react";
import "./VGestionCursosSubCursos.css";
import TablaGestionSubCursos from "./TablaGestionSubCursos/TablaGestionSubCursos";
import FormularioAgregarSubCurso from "./FormularioAgregarSubCurso/FormularioAgregarSubCurso";
import SubcursoService from "../../../services/subcursoService";
import { Button, Portal, Dialog, CloseButton } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";


function VGestionCursosSubCursos() {
  const [subcursos, setSubCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    //For dialog

  const [openDialogAddSubCourse, setOpenDialogAddSubCourse] = useState(false);

  useEffect(() => {
    fetchSubCursos(); // Cargar los subcursos al montar el componente
  }, []);

  const fetchSubCursos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await SubcursoService.getAllSubCurso();
      setSubCursos(response.data);
    } catch (error) {
      console.error(error)
      setError("Error al cargar subcursos. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar subcurso en vivo
  const handleSubCursoUpdated = (updatedSubcurso) => {
    setSubCursos((prevSubCursos) =>
      prevSubCursos.map((subcurso) =>
        subcurso.subcursoId === updatedSubcurso.subcursoId
          ? updatedSubcurso
          : subcurso
      )
    );
  };

  // Eliminar subcurso en vivo
  const handleSubCursoDeleted = (deletedId) => {
    setSubCursos((prevSubCursos) =>
      prevSubCursos.filter((subcurso) => subcurso.subcursoId !== deletedId)
    );
  };

  // Agregar subcurso en vivo
  const handleSubCursoAdded = (newSubcurso) => {
    setSubCursos((prevSubCursos) => [...prevSubCursos, newSubcurso]);
  };

  if (loading) return <div>Cargando subcursos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VGestionCursosSubCursosContainer">
      <div className="VGestionCursosSubCursosContainerTitle">
        <h3>SubCursos</h3>
                {/*boton agregar estudiante*/}
        <Button
          colorPalette="red"
          rounded="lg"
          variant="outline"
          ml="auto"
          onClick={() => setOpenDialogAddSubCourse(true)}
          aria-label="Agregar Subcurso"
        >
          Agregar <IoIosAddCircleOutline />
        </Button>
      </div>
      <div className="VGestionSubCursosContainer">
        <TablaGestionSubCursos
          subcursos={subcursos}
          onSubCursoUpdated={handleSubCursoUpdated}
          onSubCursoDeleted={handleSubCursoDeleted}
        />
      </div>
            <Dialog.Root
              placement="center"
              motionPreset="scale"
              open={openDialogAddSubCourse}
              onOpenChange={(e) => setOpenDialogAddSubCourse(e.open)}
              size="lg"
            >
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>
                      <FormularioAgregarSubCurso onSubCursoAdded={handleSubCursoAdded} />
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

export default VGestionCursosSubCursos;
