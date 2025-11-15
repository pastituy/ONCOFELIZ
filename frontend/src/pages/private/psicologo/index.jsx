import React, { useState, useEffect } from "react";
import {
  ActionBar,
  CloseButton,
  Container,
  ContentArea,
  FormGrid,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
  ModalTitle,
  PrimaryButton,
  SearchInput,
  SecondaryButton,
  Select,
  StatusBadge,
  Tab,
  TabContainer,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TextArea,
} from "../../../styles/stylePsicologo";

const API_BASE_URL = "http://localhost:3000";

const Psicologo = () => {
  const [activeTab, setActiveTab] = useState("historiales");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para los datos
  const [sesionesData, setSesionesData] = useState([]);
  const [historialesData, setHistorialesData] = useState([]);
  const [agendaData, setAgendaData] = useState([]);
  const [pacientesData, setPacientesData] = useState([]);

  // Estados para formularios
  const [formData, setFormData] = useState({});

  // Cargar datos iniciales
  useEffect(() => {
    loadAllData();
  }, []);

  // Función para cargar todos los datos
  const loadAllData = async () => {
    await Promise.all([
      loadPacientes(),
      loadSesiones(),
      loadHistoriales(),
      loadCitas(),
    ]);
  };

  // Funciones para cargar datos desde la API
  const loadPacientes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/paciente`);
      const result = await response.json();
      if (response.ok) {
        setPacientesData(result.data);
      } else {
        console.error("Error al cargar pacientes:", result.mensaje);
      }
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
      setError("Error al conectar con el servidor");
    }
  };

  const loadSesiones = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sesiones`);
      console.log(response);
      const result = await response.json();
      if (response.ok) {
        setSesionesData(result.data);
      } else {
        console.error("Error al cargar sesiones:", result.mensaje);
      }
    } catch (error) {
      console.error("Error al cargar sesiones:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const loadHistoriales = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/historiales`);
      const result = await response.json();
      if (response.ok) {
        setHistorialesData(result.data);
      } else {
        console.error("Error al cargar historiales:", result.mensaje);
      }
    } catch (error) {
      console.error("Error al cargar historiales:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const loadCitas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/citas`);
      const result = await response.json();
      if (response.ok) {
        setAgendaData(result.data);
      } else {
        console.error("Error al cargar citas:", result.mensaje);
      }
    } catch (error) {
      console.error("Error al cargar citas:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // Funciones para crear nuevos registros
  const createSesion = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sesiones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSesionesData((prev) => [result.data, ...prev]);
        return { success: true, message: result.mensaje };
      } else {
        return { success: false, message: result.mensaje };
      }
    } catch (error) {
      console.error("Error al crear sesión:", error);
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  const createHistorial = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/historiales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setHistorialesData((prev) => [result.data, ...prev]);
        return { success: true, message: result.mensaje };
      } else {
        return { success: false, message: result.mensaje };
      }
    } catch (error) {
      console.error("Error al crear historial:", error);
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  const createCita = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/citas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setAgendaData((prev) => [result.data, ...prev]);
        return { success: true, message: result.mensaje };
      } else {
        return { success: false, message: result.mensaje };
      }
    } catch (error) {
      console.error("Error al crear cita:", error);
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  // Funciones para actualizar registros
  const updateSesion = async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sesiones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSesionesData((prev) =>
          prev.map((item) => (item.id === id ? result.data : item))
        );
        return { success: true, message: result.mensaje };
      } else {
        return { success: false, message: result.mensaje };
      }
    } catch (error) {
      console.error("Error al actualizar sesión:", error);
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  const updateCita = async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/citas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setAgendaData((prev) =>
          prev.map((item) => (item.id === id ? result.data : item))
        );
        return { success: true, message: result.mensaje };
      } else {
        return { success: false, message: result.mensaje };
      }
    } catch (error) {
      console.error("Error al actualizar cita:", error);
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  // Funciones auxiliares para obtener valores de enum
  const getRecordatorioValue = (texto) => {
    const recordatorios = {
      "Enviar recordatorio 24h antes": "RECORDATORIO_24H",
      "Enviar recordatorio 1 hora antes": "RECORDATORIO_1H",
      "Llamar para confirmar": "LLAMAR_CONFIRMAR",
      "Sin recordatorio": "SIN_RECORDATORIO",
    };
    return recordatorios[texto] || "SIN_RECORDATORIO";
  };

  const getTipoSesionValue = (texto) => {
    const tipos = {
      Individual: "INDIVIDUAL",
      Grupal: "GRUPAL",
      Familiar: "FAMILIAR",
    };
    return tipos[texto] || "INDIVIDUAL";
  };

  const getTipoCitaValue = (texto) => {
    const tipos = {
      Consulta: "CONSULTA",
      Seguimiento: "SEGUIMIENTO",
      Evaluación: "EVALUACION",
    };
    return tipos[texto] || "CONSULTA";
  };

  // Manejar cambios en formularios
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setError("");

    if (item) {
      // Editar - cargar datos existentes
      setFormData(item);
    } else {
      // Nuevo - limpiar formulario
      setFormData({});
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
    setFormData({});
    setError("");
  };

  const validateForm = () => {
    switch (modalType) {
      case "sesion":
        if (!formData.pacienteId || !formData.fecha || !formData.hora) {
          setError("Por favor complete todos los campos obligatorios");
          return false;
        }
        break;
      case "historial":
        if (
          !formData.pacienteId ||
          !formData.diagnostico ||
          !formData.fechaIngreso
        ) {
          setError("Por favor complete todos los campos obligatorios");
          return false;
        }
        break;
      case "cita":
        if (!formData.pacienteId || !formData.fecha || !formData.hora) {
          setError("Por favor complete todos los campos obligatorios");
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    let result = { success: false, message: "" };

    try {
      switch (modalType) {
        case "sesion":
          if (formData.id) {
            // Actualizar sesión existente
            result = await updateSesion(formData.id, {
              estado: formData.estado,
              notas: formData.notas,
            });
          } else {
            // Crear nueva sesión
            result = await createSesion({
              pacienteId: formData.pacienteId,
              fecha: formData.fecha,
              hora: formData.hora,
              tipo: getTipoSesionValue(formData.tipo),
              duracion: parseInt(formData.duracion) || 60,
              notas: formData.notas,
            });
          }
          break;
        case "historial":
          result = await createHistorial({
            pacienteId: formData.pacienteId,
            diagnostico: formData.diagnostico,
            fechaIngreso: formData.fechaIngreso,
            observaciones: formData.observaciones,
          });
          break;
        case "cita":
          if (formData.id) {
            // Actualizar cita existente
            result = await updateCita(formData.id, {
              estado: formData.estado,
              notas: formData.notas,
            });
          } else {
            // Crear nueva cita
            result = await createCita({
              pacienteId: formData.pacienteId,
              fecha: formData.fecha,
              hora: formData.hora,
              tipo: getTipoCitaValue(formData.tipo),
              recordatorio:
                formData.recordatorio || "Enviar recordatorio 24h antes",
              notas: formData.notas,
            });
          }
          break;
      }

      if (result.success) {
        handleCloseModal();
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setError("Error inesperado al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar estado rápidamente
  const handleQuickStatusChange = async (type, id, newStatus) => {
    let result = { success: false };

    switch (type) {
      case "sesion":
        result = await updateSesion(id, { estado: newStatus });
        break;
      case "cita":
        result = await updateCita(id, { estado: newStatus });
        break;
    }

    if (!result.success) {
      alert("Error al actualizar el estado");
    }
  };

  // Función para filtrar datos según el término de búsqueda
  const filterData = (data) => {
    if (!searchTerm) return data;
    return data.filter(
      (item) =>
        item.paciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.diagnostico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const renderSesiones = () => (
    <>
      <ActionBar>
        <SearchInput
          placeholder="Buscar sesiones por paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton onClick={() => handleOpenModal("sesion")}>
          + Nueva Sesión
        </PrimaryButton>
      </ActionBar>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Paciente</TableHeader>
              <TableHeader>Fecha</TableHeader>
              <TableHeader>Hora</TableHeader>
              <TableHeader>Tipo</TableHeader>
              <TableHeader>Duración</TableHeader>
              <TableHeader>Estado</TableHeader>
              <TableHeader>Notas</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filterData(sesionesData).map((sesion) => (
              <TableRow key={sesion.id}>
                <TableCell>{sesion.paciente}</TableCell>
                <TableCell>{sesion.fecha}</TableCell>
                <TableCell>{sesion.hora}</TableCell>
                <TableCell>{sesion.tipo}</TableCell>
                <TableCell>{sesion.duracion}</TableCell>
                <TableCell>
                  <StatusBadge status={sesion.estado}>
                    {sesion.estado}
                  </StatusBadge>
                </TableCell>
                <TableCell>{sesion.notas || "-"}</TableCell>
                <TableCell>
                  <SecondaryButton
                    onClick={() => handleOpenModal("sesion", sesion)}
                    style={{ marginRight: "5px" }}
                  >
                    Editar
                  </SecondaryButton>
                  {sesion.estado === "programada" && (
                    <SecondaryButton
                      onClick={() =>
                        handleQuickStatusChange(
                          "sesion",
                          sesion.id,
                          "completada"
                        )
                      }
                    >
                      Completar
                    </SecondaryButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );

  const renderHistoriales = () => (
    <>
      <ActionBar>
        <SearchInput
          placeholder="Buscar historiales por paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton onClick={() => handleOpenModal("historial")}>
          + Nuevo Historial
        </PrimaryButton>
      </ActionBar>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Paciente</TableHeader>
              <TableHeader>Diagnóstico</TableHeader>
              <TableHeader>Fecha Ingreso</TableHeader>
              <TableHeader>Sesiones</TableHeader>
              <TableHeader>Estado</TableHeader>
              <TableHeader>Última Actualización</TableHeader>
{/*               <TableHeader>Acciones</TableHeader>
 */}            </tr>
          </thead>
          <tbody>
            {filterData(historialesData).map((historial) => (
              <TableRow key={historial.id}>
                <TableCell>{historial.paciente}</TableCell>
                <TableCell>{historial.diagnostico}</TableCell>
                <TableCell>{historial.fechaIngreso}</TableCell>
                <TableCell>{historial.sesiones}</TableCell>
                <TableCell>
                  <StatusBadge status="completada">
                    {historial.estado}
                  </StatusBadge>
                </TableCell>
                <TableCell>{historial.ultimaActualizacion}</TableCell>
               {/*  <TableCell>
                  <SecondaryButton>Ver</SecondaryButton>
                  <SecondaryButton style={{ marginLeft: "5px" }}>
                    Editar
                  </SecondaryButton>
                </TableCell> */}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );

  const renderAgenda = () => (
    <>
      <ActionBar>
        <SearchInput
          placeholder="Buscar citas por paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton onClick={() => handleOpenModal("cita")}>
          + Nueva Cita
        </PrimaryButton>
      </ActionBar>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Paciente</TableHeader>
              <TableHeader>Fecha</TableHeader>
              <TableHeader>Hora</TableHeader>
              <TableHeader>Tipo</TableHeader>
              <TableHeader>Estado</TableHeader>
              <TableHeader>Recordatorio</TableHeader>
              <TableHeader>Notas</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filterData(agendaData).map((cita) => (
              <TableRow key={cita.id}>
                <TableCell>{cita.paciente}</TableCell>
                <TableCell>{cita.fecha}</TableCell>
                <TableCell>{cita.hora}</TableCell>
                <TableCell>{cita.tipo}</TableCell>
                <TableCell>
                  <StatusBadge status={cita.estado}>{cita.estado}</StatusBadge>
                </TableCell>
                <TableCell>{cita.recordatorio}</TableCell>
                <TableCell>{cita.notas || "-"}</TableCell>
                <TableCell>
                  <SecondaryButton
                    onClick={() => handleOpenModal("cita", cita)}
                    style={{ marginRight: "5px" }}
                  >
                    Editar
                  </SecondaryButton>
                  {cita.estado === "programada" && (
                    <SecondaryButton
                      onClick={() =>
                        handleQuickStatusChange("cita", cita.id, "confirmada")
                      }
                    >
                      Confirmar
                    </SecondaryButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );

  const renderModal = () => {
    if (!showModal) return null;

    const getModalTitle = () => {
      const isEditing = formData.id;
      switch (modalType) {
      /*   case "sesion":
          return isEditing ? "Editar Sesión" : "Nueva Sesión"; */
        case "historial":
          return "Nuevo Historial";
        case "cita":
          return isEditing ? "Editar Cita" : "Nueva Cita";
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
          {error && (
            <div
              style={{
                color: "red",
                backgroundColor: "#ffebee",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px 0",
              }}
            >
              {error}
            </div>
          )}
          {modalType === "sesion" && (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>Paciente</Label>
                  <Select
                    value={formData.pacienteId || ""}
                    onChange={(e) =>
                      handleInputChange("pacienteId", e.target.value)
                    }
                    disabled={formData.id}
                  >
                    <option value="">Seleccionar paciente...</option>
                    {pacientesData.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nombre} {paciente.apellidos}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Tipo de Sesión</Label>
                  <Select
                    value={formData.tipo || "Individual"}
                    onChange={(e) => handleInputChange("tipo", e.target.value)}
                    disabled={formData.id}
                  >
                    <option>Individual</option>
                    <option>Grupal</option>
                    <option>Familiar</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label>Fecha</Label>
                  <Input
                    type="date"
                    value={formData.fecha || ""}
                    onChange={(e) => handleInputChange("fecha", e.target.value)}
                    disabled={formData.id}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Hora</Label>
                  <Input
                    type="time"
                    value={formData.hora || ""}
                    onChange={(e) => handleInputChange("hora", e.target.value)}
                    disabled={formData.id}
                  />
                </FormGroup>
              </FormGrid>

              {!formData.id && (
                <FormGroup>
                  <Label>Duración (minutos)</Label>
                  <Input
                    type="number"
                    placeholder="60"
                    value={formData.duracion || ""}
                    onChange={(e) =>
                      handleInputChange("duracion", e.target.value)
                    }
                  />
                </FormGroup>
              )}
              {formData.id && (
                <FormGroup>
                  <Label>Estado</Label>
                  <Select
                    value={formData.estado || ""}
                    onChange={(e) =>
                      handleInputChange("estado", e.target.value)
                    }
                  >
                    <option value="programada">Programada</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                    <option value="reprogramada">Reprogramada</option>
                  </Select>
                </FormGroup>
              )}
              <FormGroup>
                <Label>Notas de la Sesión</Label>
                <TextArea
                  placeholder="Escriba las observaciones y notas de la sesión..."
                  value={formData.notas || ""}
                  onChange={(e) => handleInputChange("notas", e.target.value)}
                />
              </FormGroup>
            </>
          )}

          {modalType === "historial" && (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>Paciente</Label>
                  <Select
                    value={formData.pacienteId || ""}
                    onChange={(e) =>
                      handleInputChange("pacienteId", e.target.value)
                    }
                  >
                    <option value="">Seleccionar paciente...</option>
                    {pacientesData.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nombre} {paciente.apellidos}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Fecha de Ingreso</Label>
                  <Input
                    type="date"
                    value={formData.fechaIngreso || ""}
                    onChange={(e) =>
                      handleInputChange("fechaIngreso", e.target.value)
                    }
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label>Diagnóstico</Label>
                <Input
                  placeholder="Diagnóstico principal..."
                  value={formData.diagnostico || ""}
                  onChange={(e) =>
                    handleInputChange("diagnostico", e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Observaciones Iniciales</Label>
                <TextArea
                  placeholder="Escriba las observaciones del historial clínico..."
                  value={formData.observaciones || ""}
                  onChange={(e) =>
                    handleInputChange("observaciones", e.target.value)
                  }
                />
              </FormGroup>
            </>
          )}

          {modalType === "cita" && (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>Paciente</Label>
                  <Select
                    value={formData.pacienteId || ""}
                    onChange={(e) =>
                      handleInputChange("pacienteId", e.target.value)
                    }
                    disabled={formData.id}
                  >
                    <option value="">Seleccionar paciente...</option>
                    {pacientesData.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nombre} {paciente.apellidos}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Tipo de Cita</Label>
                  <Select
                    value={formData.tipo || "Consulta"}
                    onChange={(e) => handleInputChange("tipo", e.target.value)}
                    disabled={formData.id}
                  >
                    <option>Consulta</option>
                    <option>Seguimiento</option>
                    <option>Evaluación</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label>Fecha</Label>
                  <Input
                    type="date"
                    value={formData.fecha || ""}
                    onChange={(e) => handleInputChange("fecha", e.target.value)}
                    disabled={formData.id}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Hora</Label>
                  <Input
                    type="time"
                    value={formData.hora || ""}
                    onChange={(e) => handleInputChange("hora", e.target.value)}
                    disabled={formData.id}
                  />
                </FormGroup>
              </FormGrid>
              {formData.id && (
                <FormGroup>
                  <Label>Estado</Label>
                  <Select
                    value={formData.estado || ""}
                    onChange={(e) =>
                      handleInputChange("estado", e.target.value)
                    }
                  >
                    <option value="programada">Programada</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                    <option value="reprogramada">Reprogramada</option>
                  </Select>
                </FormGroup>
              )}
              {!formData.id && (
                <FormGroup>
                  <Label>Recordatorio</Label>
                  <Select
                    value={
                      formData.recordatorio || "Enviar recordatorio 24h antes"
                    }
                    onChange={(e) =>
                      handleInputChange("recordatorio", e.target.value)
                    }
                  >
                    <option>Enviar recordatorio 24h antes</option>
                    <option>Enviar recordatorio 1 hora antes</option>
                    <option>Llamar para confirmar</option>
                    <option>Sin recordatorio</option>
                  </Select>
                </FormGroup>
              )}

              <FormGroup>
                <Label>Notas</Label>
                <TextArea
                  placeholder="Notas adicionales sobre la cita..."
                  value={formData.notas || ""}
                  onChange={(e) => handleInputChange("notas", e.target.value)}
                />
              </FormGroup>
            </>
          )}

          <ModalActions>
            <SecondaryButton onClick={handleCloseModal}>
              Cancelar
            </SecondaryButton>
            <PrimaryButton onClick={handleSubmit} disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </PrimaryButton>
          </ModalActions>
        </ModalContent>
      </Modal>
    );
  };

  const renderContent = () => {
    if (
      loading &&
      (
        (activeTab === "historiales" && historialesData.length === 0) ||
        (activeTab === "agenda" && agendaData.length === 0))
    ) {
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>Cargando...</div>
      );
    }
    if (error && !showModal) {
      return (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            color: "red",
            backgroundColor: "#ffebee",
            borderRadius: "8px",
            margin: "20px",
          }}
        >
          <p>{error}</p>
          <PrimaryButton onClick={loadAllData}>Reintentar</PrimaryButton>
        </div>
      );
    }
    switch (activeTab) {
     /*  case "sesiones":
        return renderSesiones(); */
      case "historiales":
        return renderHistoriales();
      case "agenda":
        return renderAgenda();
      default:
        return renderSesiones();
    }
  };

  return (
    <Container>
      <TabContainer>
        {/* <Tab
          active={activeTab === "sesiones"}
          onClick={() => {
            setActiveTab("sesiones");
            setSearchTerm("");
          }}
        >
          Sesiones ({sesionesData.length})
        </Tab> */}
        <Tab
          active={activeTab === "historiales"}
          onClick={() => {
            setActiveTab("historiales");
            setSearchTerm("");
          }}
        >
          Historiales Clínicos ({historialesData.length})
        </Tab>
        <Tab
          active={activeTab === "agenda"}
          onClick={() => {
            setActiveTab("agenda");
            setSearchTerm("");
          }}
        >
          Agenda ({agendaData.length})
        </Tab>
      </TabContainer>

      <ContentArea>{renderContent()}</ContentArea>

      {renderModal()}
    </Container>
  );
};

export default Psicologo;
