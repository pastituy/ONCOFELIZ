import { useState, useEffect } from "react";
import {
  ActionBar,
  CloseButton,
  Container,
  ContentArea,
  ErrorMessage,
  FormGrid,
  FormGroup,
  Input,
  Label,
  LoadingSpinner,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
  ModalTitle,
  PrimaryButton,
  ScaleInput,
  ScaleItem,
  ScaleLabel,
  SearchInput,
  SecondaryButton,
  Select,
  StatusBadge,
  SuccessMessage,
  Tab,
  TabContainer,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TextArea,
  TotalScore,
  VulnerabilityScale,
} from "../../../styles/styleTrabajor";

const API_BASE_URL = "http://localhost:3000";

const TrabajoSocial = () => {
  const [activeTab, setActiveTab] = useState("expedientes");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);
  // Estados para los datos
  const [expedientes, setExpedientes] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [derivaciones, setDerivaciones] = useState([]);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [profesionales, setProfesionales] = useState([]);

  // Estados para formularios
  const [formData, setFormData] = useState({});
  const [vulnerabilityScores, setVulnerabilityScores] = useState({
    situacionEconomica: 0,
    condicionesVivienda: 0,
    saludFamiliar: 0,
    educacionDesarrollo: 0,
  });

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
    loadBeneficiarios();
    loadProfesionales();
  }, [activeTab]);

  // Función para hacer peticiones a la API
  const apiRequest = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      switch (activeTab) {
        case "expedientes":
          endpoint = "/expedientes";
          break;
        case "visitas":
          endpoint = "/visitas";
          break;
        case "vulnerabilidad":
          endpoint = "/evaluaciones-vulnerabilidad";
          break;
        case "derivaciones":
          endpoint = "/derivaciones";
          break;
        default:
          endpoint = "/expedientes";
      }

      const searchQuery = searchTerm
        ? `?search=${encodeURIComponent(searchTerm)}`
        : "";
      const result = await apiRequest(`${endpoint}${searchQuery}`);

      switch (activeTab) {
        case "expedientes":
          setExpedientes(result.data || []);
          break;
        case "visitas":
          setVisitas(result.data || []);
          break;
        case "vulnerabilidad":
          setEvaluaciones(result.data || []);
          break;
        case "derivaciones":
          setDerivaciones(result.data || []);
          break;
      }
    } catch (error) {
      setError(`Error al cargar datos: ${error.message}`);
    }
    setLoading(false);
  };

  const loadBeneficiarios = async () => {
    try {
      const result = await apiRequest("/beneficiarios");
      setBeneficiarios(result.data || []);
    } catch (error) {
      console.error("Error loading beneficiarios:", error);
    }
  };

  const loadProfesionales = async () => {
    try {
      const result = await apiRequest("/profesionales");
      setProfesionales(result.data || []);
    } catch (error) {
      console.error("Error loading profesionales:", error);
    }
  };

  // Debounce para búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadData();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleOpenModal = (type, record = null) => {
    setModalType(type);
    setEditingRecord(record);
    setViewingRecord(type === "view" ? record : null);

    if (
      record &&
      (type === "edit-expediente" ||
        type === "edit-visita" ||
        type === "edit-vulnerabilidad" ||
        type === "edit-derivacion")
    ) {
      // Cargar datos del registro para edición con mapeo correcto
      const mappedData = { ...record };

      // Mapear IDs de relaciones si existen
      if (record.beneficiario) {
        if (typeof record.beneficiario === "object" && record.beneficiario.id) {
          mappedData.beneficiarioId = record.beneficiario.id;
        } else if (record.beneficiarioId) {
          mappedData.beneficiarioId = record.beneficiarioId;
        }
      }
      if (record.profesionalDestino) {
        if (
          typeof record.profesionalDestino === "object" &&
          record.profesionalDestino.id
        ) {
          mappedData.profesionalDestinoId = record.profesionalDestino.id;
        } else if (record.profesionalDestinoId) {
          mappedData.profesionalDestinoId = record.profesionalDestinoId;
        }
      }
      if (record.fechaVisita) {
        // Si viene en formato ISO, extraer solo la fecha
        mappedData.fechaVisita = record.fechaVisita.includes("T")
          ? record.fechaVisita.split("T")[0]
          : record.fechaVisita;
      }
      if (record.proximaVisita) {
        mappedData.proximaVisita = record.proximaVisita.includes("T")
          ? record.proximaVisita.split("T")[0]
          : record.proximaVisita;
      }
      if (record.fechaDerivacion) {
        mappedData.fechaDerivacion = record.fechaDerivacion.includes("T")
          ? record.fechaDerivacion.split("T")[0]
          : record.fechaDerivacion;
      }
      if (record.fechaSeguimiento) {
        mappedData.fechaSeguimiento = record.fechaSeguimiento.includes("T")
          ? record.fechaSeguimiento.split("T")[0]
          : record.fechaSeguimiento;
      }
      if (type === "edit-vulnerabilidad") {
        setVulnerabilityScores({
          situacionEconomica: record.situacionEconomica || 0,
          condicionesVivienda: record.condicionesVivienda || 0,
          saludFamiliar: record.saludFamiliar || 0,
          educacionDesarrollo: record.educacionDesarrollo || 0,
        });
      }

      console.log("Datos mapeados para edición:", mappedData);
      setFormData(mappedData);
    } else {
      setFormData({});
      setVulnerabilityScores({
        situacionEconomica: 0,
        condicionesVivienda: 0,
        saludFamiliar: 0,
        educacionDesarrollo: 0,
      });
    }

    setShowModal(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
    setFormData({});
    setEditingRecord(null);
    setViewingRecord(null);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVulnerabilityChange = (field, value) => {
    const numValue = Math.max(0, Math.min(25, parseInt(value) || 0));
    setVulnerabilityScores((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const getTotalVulnerabilityScore = () => {
    return Object.values(vulnerabilityScores).reduce(
      (total, score) => total + score,
      0
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      let endpoint = "";
      let data = { ...formData };
      const method = editingRecord ? "PUT" : "POST";

      switch (modalType) {
        case "expediente":
        case "edit-expediente":
          endpoint = editingRecord
            ? `/expedientes/${editingRecord.id}`
            : "/expedientes";
          break;
        case "visita":
        case "edit-visita":
          endpoint = editingRecord
            ? `/visitas/${editingRecord.id}`
            : "/visitas";
          break;
        case "vulnerabilidad":
        case "edit-vulnerabilidad":
          endpoint = editingRecord
            ? `/evaluaciones-vulnerabilidad/${editingRecord.id}`
            : "/evaluaciones-vulnerabilidad";
          data = {
            ...data,
            ...vulnerabilityScores,
          };
          break;
        case "derivacion":
        case "edit-derivacion":
          endpoint = editingRecord
            ? `/derivaciones/${editingRecord.id}`
            : "/derivaciones";
          break;
      }

      await apiRequest(endpoint, {
        method,
        body: JSON.stringify(data),
      });

      setSuccess(
        editingRecord
          ? "Registro actualizado correctamente"
          : "Registro creado correctamente"
      );
      setTimeout(() => {
        handleCloseModal();
        loadData();
      }, 2000);
    } catch (error) {
      setError(`Error al guardar: ${error.message}`);
    }
    setLoading(false);
  };

  const renderExpedientes = () => (
    <>
      <ActionBar>
        <SearchInput
          placeholder="Buscar expedientes por beneficiario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton onClick={() => handleOpenModal("expediente")}>
          + Nuevo Expediente
        </PrimaryButton>
      </ActionBar>

      {loading ? (
        <LoadingSpinner>Cargando expedientes...</LoadingSpinner>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Beneficiario</TableHeader>
                <TableHeader>Composición Familiar</TableHeader>
                <TableHeader>Ingresos</TableHeader>
                <TableHeader>Vulnerabilidad</TableHeader>
                <TableHeader>Última Actualización</TableHeader>
                <TableHeader>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {expedientes.map((expediente) => (
                <TableRow key={expediente.id}>
                  <TableCell>{expediente.beneficiario}</TableCell>
                  <TableCell>{expediente.composicionFamiliar}</TableCell>
                  <TableCell>{expediente.ingresosFamiliares}</TableCell>
                  <TableCell>
                    <StatusBadge status={expediente.nivelVulnerabilidad}>
                      {expediente.nivelVulnerabilidad}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{expediente.fechaActualizacion}</TableCell>
                  <TableCell>
                    <SecondaryButton
                      onClick={() => handleOpenModal("view", expediente)}
                    >
                      Ver
                    </SecondaryButton>
                    {/* <SecondaryButton
                      onClick={() =>
                        handleOpenModal("edit-expediente", expediente)
                      }
                      style={{ marginLeft: "8px" }}
                    >
                      Editar
                    </SecondaryButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );

  const renderVisitas = () => (
    <>
      <ActionBar>
        <SearchInput
          placeholder="Buscar visitas por beneficiario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton onClick={() => handleOpenModal("visita")}>
          + Registrar Visita
        </PrimaryButton>
      </ActionBar>

      {loading ? (
        <LoadingSpinner>Cargando visitas...</LoadingSpinner>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Beneficiario</TableHeader>
                <TableHeader>Fecha</TableHeader>
                <TableHeader>Tipo</TableHeader>
                <TableHeader>Objetivo</TableHeader>
                <TableHeader>Estado</TableHeader>
                <TableHeader>Próxima Visita</TableHeader>
                <TableHeader>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {visitas.map((visita) => (
                <TableRow key={visita.id}>
                  <TableCell>{visita.beneficiario}</TableCell>
                  <TableCell>{visita.fechaVisita}</TableCell>
                  <TableCell>{visita.tipoVisita}</TableCell>
                  <TableCell>{visita.objetivo}</TableCell>
                  <TableCell>
                    <StatusBadge status={visita.estado}>
                      {visita.estado}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{visita.proximaVisita}</TableCell>
                  <TableCell>
                    <SecondaryButton
                      onClick={() => handleOpenModal("view", visita)}
                    >
                      Ver
                    </SecondaryButton>
                    {/* <SecondaryButton
                      onClick={() => handleOpenModal("edit-visita", visita)}
                      style={{ marginLeft: "8px" }}
                    >
                      Editar
                    </SecondaryButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );

  const renderVulnerabilidad = () => (
    <>
      <ActionBar>
        <SearchInput
          placeholder="Buscar evaluaciones por beneficiario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton onClick={() => handleOpenModal("vulnerabilidad")}>
          + Nueva Evaluación
        </PrimaryButton>
      </ActionBar>

      {loading ? (
        <LoadingSpinner>Cargando evaluaciones...</LoadingSpinner>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Beneficiario</TableHeader>
                <TableHeader>Puntaje Total</TableHeader>
                <TableHeader>Nivel</TableHeader>
                <TableHeader>Fecha Evaluación</TableHeader>
                <TableHeader>Factores de Riesgo</TableHeader>
                <TableHeader>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {evaluaciones.map((evaluacion) => (
                <TableRow key={evaluacion.id}>
                  <TableCell>{evaluacion.beneficiario}</TableCell>
                  <TableCell>{evaluacion.puntajeTotal}</TableCell>
                  <TableCell>
                    <StatusBadge status={evaluacion.nivel}>
                      {evaluacion.nivel}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{evaluacion.fechaEvaluacion}</TableCell>
                  <TableCell>{evaluacion.factoresRiesgo}</TableCell>
                  <TableCell>
                    <SecondaryButton
                      onClick={() => handleOpenModal("view", evaluacion)}
                    >
                      Ver
                    </SecondaryButton>
                    {/* <SecondaryButton
                      onClick={() =>
                        handleOpenModal("edit-vulnerabilidad", evaluacion)
                      }
                      style={{ marginLeft: "8px" }}
                    >
                      Actualizar
                    </SecondaryButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );

  const renderDerivaciones = () => (
    <>
      <ActionBar>
        <SearchInput
          placeholder="Buscar derivaciones por beneficiario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton onClick={() => handleOpenModal("derivacion")}>
          + Nueva Derivación
        </PrimaryButton>
      </ActionBar>

      {loading ? (
        <LoadingSpinner>Cargando derivaciones...</LoadingSpinner>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Beneficiario</TableHeader>
                <TableHeader>Profesional Destino</TableHeader>
                <TableHeader>Motivo</TableHeader>
                <TableHeader>Fecha</TableHeader>
                <TableHeader>Seguimiento</TableHeader>
                <TableHeader>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {derivaciones.map((derivacion) => (
                <TableRow key={derivacion.id}>
                  <TableCell>{derivacion.beneficiario}</TableCell>
                  <TableCell>{derivacion.profesionalDestino}</TableCell>
                  <TableCell>{derivacion.motivo}</TableCell>
                  <TableCell>{derivacion.fechaDerivacion}</TableCell>
                  {/* <TableCell>
                    <StatusBadge status={derivacion.estado}>
                      {derivacion.estado}
                    </StatusBadge>
                  </TableCell> */}
                  <TableCell>{derivacion.fechaSeguimiento}</TableCell>
                  <TableCell>
                    <SecondaryButton
                      onClick={() => handleOpenModal("view", derivacion)}
                    >
                      Ver
                    </SecondaryButton>
                   {/*  <SecondaryButton
                      onClick={() =>
                        handleOpenModal("edit-derivacion", derivacion)
                      }
                      style={{ marginLeft: "8px" }}
                    >
                      Seguir
                    </SecondaryButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );

  const renderModal = () => {
    if (!showModal) return null;

    const getModalTitle = () => {
      if (viewingRecord) return "Ver Detalles";

      switch (modalType) {
        case "expediente":
          return "Nuevo Expediente Social";
        case "edit-expediente":
          return "Editar Expediente Social";
        case "visita":
          return "Registrar Visita";
        case "edit-visita":
          return "Editar Visita";
        case "vulnerabilidad":
          return "Evaluación de Vulnerabilidad";
        case "edit-vulnerabilidad":
          return "Actualizar Evaluación";
        case "derivacion":
          return "Nueva Derivación";
        case "edit-derivacion":
          return "Seguir Derivación";
        default:
          return "Formulario";
      }
    };

    return (
      <Modal show={showModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{getModalTitle()}</ModalTitle>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
          </ModalHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          {viewingRecord && (
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f8f9fa",
                margin: "20px 0",
              }}
            >
              <h3>Información del Registro</h3>
              {Object.entries(viewingRecord).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          )}
          {(modalType === "expediente" || modalType === "edit-expediente") && (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>Beneficiario</Label>
                  <Select
                    value={formData.beneficiarioId || ""}
                    onChange={(e) =>
                      handleInputChange("beneficiarioId", e.target.value)
                    }
                    disabled={viewingRecord}
                  >
                    <option value="">Seleccionar beneficiario...</option>
                    {beneficiarios.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nombre} {b.apellido}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Composición Familiar</Label>
                  <Input
                    type="number"
                    placeholder="Número de miembros"
                    value={formData.composicionFamiliar || ""}
                    onChange={(e) =>
                      handleInputChange("composicionFamiliar", e.target.value)
                    }
                  />
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label>Ingresos Familiares</Label>
                  <Input
                    type="number"
                    placeholder="Ingresos mensuales"
                    value={formData.ingresosFamiliares || ""}
                    onChange={(e) =>
                      handleInputChange("ingresosFamiliares", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Nivel de Vulnerabilidad</Label>
                  <Select
                    value={formData.nivelVulnerabilidad || ""}
                    onChange={(e) =>
                      handleInputChange("nivelVulnerabilidad", e.target.value)
                    }
                  >
                    <option value="">Seleccionar nivel...</option>
                    <option value="BAJO">Bajo</option>
                    <option value="MEDIO">Medio</option>
                    <option value="ALTO">Alto</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <div style={{ padding: "0 20px" }}>
                <FormGroup>
                  <Label>Condiciones de Vivienda</Label>
                  <TextArea
                    placeholder="Describa las condiciones de la vivienda..."
                    value={formData.condicionesVivienda || ""}
                    onChange={(e) =>
                      handleInputChange("condicionesVivienda", e.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Observaciones Socioeconómicas</Label>
                  <TextArea
                    placeholder="Información adicional sobre la situación socioeconómica..."
                    value={formData.observacionesSocioeco || ""}
                    onChange={(e) =>
                      handleInputChange("observacionesSocioeco", e.target.value)
                    }
                  />
                </FormGroup>
              </div>
            </>
          )}

          {(modalType === "visita" || modalType === "edit-visita") && (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>Beneficiario</Label>
                  <Select
                    value={formData.beneficiarioId || ""}
                    onChange={(e) =>
                      handleInputChange("beneficiarioId", e.target.value)
                    }
                  >
                    <option value="">Seleccionar beneficiario...</option>
                    {beneficiarios.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nombre} {b.apellido}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Tipo de Visita</Label>
                  <Select
                    value={formData.tipoVisita || ""}
                    onChange={(e) =>
                      handleInputChange("tipoVisita", e.target.value)
                    }
                  >
                    <option value="">Seleccionar tipo...</option>
                    <option value="DOMICILIARIA">Domiciliaria</option>
                    <option value="SEGUIMIENTO">Seguimiento</option>
                    <option value="ENTREVISTA">Entrevista</option>
                    <option value="EVALUACION">Evaluación</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label>Fecha de Visita</Label>
                  <Input
                    type="date"
                    value={formData.fechaVisita || ""}
                    onChange={(e) =>
                      handleInputChange("fechaVisita", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Próxima Visita</Label>
                  <Input
                    type="date"
                    value={formData.proximaVisita || ""}
                    onChange={(e) =>
                      handleInputChange("proximaVisita", e.target.value)
                    }
                  />
                </FormGroup>
              </FormGrid>

              <div style={{ padding: "0 20px" }}>
                <FormGroup>
                  <Label>Objetivo de la Visita</Label>
                  <Input
                    placeholder="Propósito principal de la visita..."
                    value={formData.objetivo || ""}
                    onChange={(e) =>
                      handleInputChange("objetivo", e.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Observaciones del Entorno</Label>
                  <TextArea
                    placeholder="Describa las condiciones observadas durante la visita..."
                    value={formData.observacionesEntorno || ""}
                    onChange={(e) =>
                      handleInputChange("observacionesEntorno", e.target.value)
                    }
                  />
                </FormGroup>
              </div>
            </>
          )}

          {(modalType === "vulnerabilidad" ||
            modalType === "edit-vulnerabilidad") && (
            <div style={{ padding: "0 20px" }}>
              <FormGroup>
                <Label>Beneficiario</Label>
                <Select
                  value={formData.beneficiarioId || ""}
                  onChange={(e) =>
                    handleInputChange("beneficiarioId", e.target.value)
                  }
                >
                  <option value="">Seleccionar beneficiario...</option>
                  {beneficiarios.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nombre} {b.apellido}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <Label>Escala de Vulnerabilidad (0-25 cada categoría)</Label>
              <VulnerabilityScale>
                <ScaleItem>
                  <ScaleLabel>Situación Económica</ScaleLabel>
                  <ScaleInput
                    type="number"
                    min="0"
                    max="25"
                    placeholder="0-25"
                    value={vulnerabilityScores.situacionEconomica}
                    onChange={(e) =>
                      handleVulnerabilityChange(
                        "situacionEconomica",
                        e.target.value
                      )
                    }
                  />
                </ScaleItem>
                <ScaleItem>
                  <ScaleLabel>Condiciones de Vivienda</ScaleLabel>
                  <ScaleInput
                    type="number"
                    min="0"
                    max="25"
                    placeholder="0-25"
                    value={vulnerabilityScores.condicionesVivienda}
                    onChange={(e) =>
                      handleVulnerabilityChange(
                        "condicionesVivienda",
                        e.target.value
                      )
                    }
                  />
                </ScaleItem>
                <ScaleItem>
                  <ScaleLabel>Salud Familiar</ScaleLabel>
                  <ScaleInput
                    type="number"
                    min="0"
                    max="25"
                    placeholder="0-25"
                    value={vulnerabilityScores.saludFamiliar}
                    onChange={(e) =>
                      handleVulnerabilityChange("saludFamiliar", e.target.value)
                    }
                  />
                </ScaleItem>
                <ScaleItem>
                  <ScaleLabel>Educación y Desarrollo</ScaleLabel>
                  <ScaleInput
                    type="number"
                    min="0"
                    max="25"
                    placeholder="0-25"
                    value={vulnerabilityScores.educacionDesarrollo}
                    onChange={(e) =>
                      handleVulnerabilityChange(
                        "educacionDesarrollo",
                        e.target.value
                      )
                    }
                  />
                </ScaleItem>
              </VulnerabilityScale>

              <TotalScore>
                Puntaje Total: {getTotalVulnerabilityScore()} / 100
              </TotalScore>

              <FormGroup>
                <Label>Factores de Riesgo Identificados</Label>
                <TextArea
                  placeholder="Describa los principales factores de riesgo..."
                  value={formData.factoresRiesgo || ""}
                  onChange={(e) =>
                    handleInputChange("factoresRiesgo", e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Recomendaciones</Label>
                <TextArea
                  placeholder="Acciones recomendadas para reducir la vulnerabilidad..."
                  value={formData.recomendaciones || ""}
                  onChange={(e) =>
                    handleInputChange("recomendaciones", e.target.value)
                  }
                />
              </FormGroup>
            </div>
          )}

          {(modalType === "derivacion" || modalType === "edit-derivacion") && (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>Beneficiario</Label>
                  <Select
                    value={formData.beneficiarioId || ""}
                    onChange={(e) =>
                      handleInputChange("beneficiarioId", e.target.value)
                    }
                  >
                    <option value="">Seleccionar beneficiario...</option>
                    {beneficiarios.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nombre} {b.apellido}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Profesional Destino</Label>
                  <Select
                    value={formData.profesionalDestinoId || ""}
                    onChange={(e) =>
                      handleInputChange("profesionalDestinoId", e.target.value)
                    }
                  >
                    <option value="">Seleccionar profesional...</option>
                    {profesionales.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.especialidad} - {p.nombre} {p.apellido}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label>Fecha de Derivación</Label>
                  <Input
                    type="date"
                    value={formData.fechaDerivacion || ""}
                    onChange={(e) =>
                      handleInputChange("fechaDerivacion", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Fecha de Seguimiento</Label>
                  <Input
                    type="date"
                    value={formData.fechaSeguimiento || ""}
                    onChange={(e) =>
                      handleInputChange("fechaSeguimiento", e.target.value)
                    }
                  />
                </FormGroup>
              </FormGrid>

              <div style={{ padding: "0 20px" }}>
                <FormGroup>
                  <Label>Motivo de la Derivación</Label>
                  <Input
                    placeholder="Razón principal de la derivación..."
                    value={formData.motivo || ""}
                    onChange={(e) =>
                      handleInputChange("motivo", e.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Observaciones</Label>
                  <TextArea
                    placeholder="Información adicional para el profesional destino..."
                    value={formData.observaciones || ""}
                    onChange={(e) =>
                      handleInputChange("observaciones", e.target.value)
                    }
                  />
                </FormGroup>
              </div>
            </>
          )}

          <ModalActions>
            <SecondaryButton onClick={handleCloseModal}>
              {viewingRecord ? "Cerrar" : "Cancelar"}
            </SecondaryButton>
            {!viewingRecord && (
              <PrimaryButton onClick={handleSubmit} disabled={loading}>
                {loading
                  ? "Guardando..."
                  : editingRecord
                  ? "Actualizar"
                  : "Guardar"}
              </PrimaryButton>
            )}
          </ModalActions>
        </ModalContent>
      </Modal>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "expedientes":
        return renderExpedientes();
      case "visitas":
        return renderVisitas();
      case "vulnerabilidad":
        return renderVulnerabilidad();
      case "derivaciones":
        return renderDerivaciones();
      default:
        return renderExpedientes();
    }
  };

  return (
    <Container>
      <TabContainer>
        <Tab
          active={activeTab === "expedientes"}
          onClick={() => setActiveTab("expedientes")}
        >
          Expedientes Sociales
        </Tab>
        <Tab
          active={activeTab === "visitas"}
          onClick={() => setActiveTab("visitas")}
        >
          Visitas y Seguimiento
        </Tab>
        <Tab
          active={activeTab === "vulnerabilidad"}
          onClick={() => setActiveTab("vulnerabilidad")}
        >
          Evaluación de Vulnerabilidad
        </Tab>
        <Tab
          active={activeTab === "derivaciones"}
          onClick={() => setActiveTab("derivaciones")}
        >
          Derivaciones
        </Tab>
      </TabContainer>

      <ContentArea>{renderContent()}</ContentArea>

      {renderModal()}
    </Container>
  );
};

export default TrabajoSocial;
