import { useEffect, useState } from "react";
import DocenteService from "../../../services/docenteService";
import "./VGestionDocentes.css";
import TablaGestionDocentes from "./TablaGestionDocentes/TablaGestionDocentes";
import FormularioAgregarDocente from "./FormularioAgregarDocente/FormularioAgregarDocente";
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import { Button, Portal, Dialog, CloseButton } from "@chakra-ui/react";
import { RiUserAddLine } from "react-icons/ri";

function VGestionDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el nivel y el término de búsqueda
  const [nivel, setNivel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //For dialog

  const [openDialogAddTeacher, setOpenDialogAddTeacher] = useState(false);

  useEffect(() => {
    fetchDocentes();
  }, [nivel, searchTerm]);

  const fetchDocentes = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (searchTerm) {
        response = await DocenteService.buscarProfesorPorDNI(searchTerm);
      } else if (nivel) {
        response = await DocenteService.listarProfesoresPorNivel(nivel);
      } else {
        response = await DocenteService.getAllDocente();
      }
      setDocentes(response.data);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
      setError("Error al cargar docentes. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocenteDeleted = (deletedId) => {
    setDocentes((prevDocentes) =>
      prevDocentes.filter((docente) => docente.usuarioId !== deletedId)
    );
  };

  const handleDocenteUpdated = (updatedDocente) => {
    setDocentes((prevDocentes) =>
      prevDocentes.map((docente) =>
        docente.usuarioId === updatedDocente.usuarioId
          ? updatedDocente
          : docente
      )
    );
  };

  const handleDocenteAdded = () => {
    fetchDocentes();
  };

  return (
    <div className="VGestionDocentesContainer">
      <div className="TitleGestionDocentes">
        <h3>Docentes</h3>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="FiltersAndSearch">
        <div>
          <div className="SearchGroup">
            <SearchComponent
              nombre={"Docentes"}
              placeholder={"Buscar por DNI"}
              onSearch={setSearchTerm}
            />
          </div>
        </div>

        <div className="FilterGroup">
          <label htmlFor="nivel-select">Nivel:</label>
          <SelectComponent
            name="nivel-select"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            options={[
              { value: "", label: "Listar Todo" },
              { value: "PRIMARIA", label: "Primaria" },
              { value: "SECUNDARIA", label: "Secundaria" },
            ]}
          />
        </div>

        {/*boton agregar docente*/}
        <Button
          colorPalette="red"
          rounded="lg"
          variant="outline"
          ml="auto"
          onClick={() => setOpenDialogAddTeacher(true)}
        >
          Agregar <RiUserAddLine />
        </Button>
      </div>

      {/* Mostrar mensaje de carga o error */}
      {loading ? (
        <div>Cargando docentes...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="VGestionDocentesContent">
          <TablaGestionDocentes
            docentes={docentes}
            onDocenteDeleted={handleDocenteDeleted}
            onDocenteUpdated={handleDocenteUpdated}
          />

          <Dialog.Root
            placement="center"
            motionPreset="scale"
            open={openDialogAddTeacher}
            onOpenChange={(e) => setOpenDialogAddTeacher(e.open)}
            size="xl"
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Body>
                    <FormularioAgregarDocente
                      onDocenteAdded={handleDocenteAdded}
                    />
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </div>
      )}
    </div>
  );
}

export default VGestionDocentes;
