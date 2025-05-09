import React, { useState, useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { IoCloseOutline, IoAdd } from "react-icons/io5";
import {
  FaCalendarCheck,
  FaFileMedical,
  FaUser,
  FaFilter,
} from "react-icons/fa";
import TreatmentTable from "../../../components/tableTratamiento"; // Import the new table component

const Tratamientos = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({});
  const [pacientes, setPacientes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataTratamientos, setDataTratamientos] = useState([]);
  const [filterActive, setFilterActive] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    tipoTratamiento: "",
    descripcion: "",
    idPaciente: "",
    estado: true,
    fecha: "",
    siguienteCita: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setForm({
      tipoTratamiento: "",
      descripcion: "",
      idPaciente: "",
      estado: true,
      fecha: "",
      siguienteCita: "",
    });
    setItem({});
  };

  const openModal = () => {
    resetForm();
    setIsEditing(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const editarTratamiento = (data) => {
    setForm({
      tipoTratamiento: data.tipoTratamiento || "",
      descripcion: data.descripcion || "",
      idPaciente: data.idPaciente || "",
      estado: data.estado ?? true,
      fecha: data.fecha || "",
      siguienteCita: data.siguienteCita || "",
    });
    setItem(data);
    setIsEditing(true);
    setShowModal(true);
  };

  const eliminarTratamiento = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tratamientos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.mensaje || "Error al eliminar tratamiento");
        return;
      }
      toast.success(data.mensaje);
      getTratamientos();
    } catch (error) {
      toast.error("Hubo un problema al eliminar el tratamiento");
    }
  };

  const getPacientes = async () => {
    try {
      const res = await fetch("http://localhost:3000/paciente");
      const data = await res.json();
      if (res.ok) {
        setPacientes(data.data);
      } else {
        toast.error(data.mensaje || "Error al obtener pacientes");
      }
    } catch (err) {
      toast.error("Error de conexión con el servidor");
    }
  };

  const getTratamientos = async () => {
    try {
      const res = await fetch("http://localhost:3000/tratamiento");
      const data = await res.json();
      if (res.ok) {
        setDataTratamientos(data.data);
        setFilteredData(data.data);
      } else {
        toast.error(data.mensaje || "Error al obtener tratamientos");
      }
    } catch (error) {
      toast.error("Hubo un problema al obtener tratamientos");
    }
  };

  useEffect(() => {
    let result = [...dataTratamientos];

    if (filterActive !== "all") {
      const isActive = filterActive === "active";
      result = result.filter((item) => item.estado === isActive);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.tipoTratamiento?.toLowerCase().includes(term) ||
          item.descripcion?.toLowerCase().includes(term)
      );
    }

    setFilteredData(result);
  }, [filterActive, searchTerm, dataTratamientos]);

  useEffect(() => {
    getTratamientos();
    getPacientes();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    console.log(form)
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3000/tratamiento/${item.id}`
      : "http://localhost:3000/tratamiento";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.mensaje || "Error al guardar tratamiento");
        return;
      }

      getTratamientos();
      closeModal();
      toast.success(result.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al guardar tratamiento");
    }
  };

  return (
    <Container>
      <PageHeader>
        <div>
          <PageDescription>
            Gestiona los tratamientos de pacientes
          </PageDescription>
        </div>
        <ActionButton onClick={openModal}>
          <IoAdd size={20} />
          <span>Nuevo Tratamiento</span>
        </ActionButton>
      </PageHeader>

      <FilterSection>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Buscar por tipo o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <FilterButtons>
          <FilterLabel>
            <FaFilter /> Filtrar por:
          </FilterLabel>
          <FilterButton
            active={filterActive === "all"}
            onClick={() => setFilterActive("all")}
          >
            Todos
          </FilterButton>
          <FilterButton
            active={filterActive === "active"}
            onClick={() => setFilterActive("active")}
          >
            Activos
          </FilterButton>
          <FilterButton
            active={filterActive === "inactive"}
            onClick={() => setFilterActive("inactive")}
          >
            Inactivos
          </FilterButton>
        </FilterButtons>
      </FilterSection>

      <CardContainer>
        <StatsCard>
          <StatsIcon color="#4A90E2">
            <FaFileMedical size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsValue>{dataTratamientos.length}</StatsValue>
            <StatsLabel>Total Tratamientos</StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#5CB85C">
            <FaCalendarCheck size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsValue>
              {dataTratamientos.filter((t) => t.estado).length}
            </StatsValue>
            <StatsLabel>Tratamientos Activos</StatsLabel>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#F1C40F">
            <FaUser size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsValue>{pacientes.length}</StatsValue>
            <StatsLabel>Pacientes Registrados</StatsLabel>
          </StatsContent>
        </StatsCard>
      </CardContainer>

      <TreatmentTable
        data={filteredData}
        onEdit={editarTratamiento}
        onDelete={eliminarTratamiento}
      />

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h2>
                {isEditing ? "Editar Tratamiento" : "Agregar Tratamiento"}
              </h2>
              <CloseButton onClick={closeModal}>
                <IoCloseOutline size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <Form onSubmit={handleGuardar}>
                <FormRow>
                  <FormGroup>
                    <Label>Tipo de Tratamiento</Label>
                    <Input
                      type="text"
                      name="tipoTratamiento"
                      value={form.tipoTratamiento}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Paciente</Label>
                    <Select
                      name="idPaciente"
                      value={form.idPaciente}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona un paciente</option>
                      {pacientes.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} {p.apellido}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>Descripción</Label>
                  <TextArea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label>Fecha de Inicio</Label>
                    <Input
                      type="date"
                      name="fecha"
                      value={form.fecha}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Siguiente Cita</Label>
                    <Input
                      type="datetime-local"
                      name="siguienteCita"
                      value={form.siguienteCita}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <StatusGroup>
                  <Label>Estado del Tratamiento</Label>
                  <StatusToggle>
                    <StatusOption
                      active={form.estado}
                      onClick={() => setForm({ ...form, estado: true })}
                    >
                      Activo
                    </StatusOption>
                    <StatusOption
                      active={!form.estado}
                      onClick={() => setForm({ ...form, estado: false })}
                    >
                      Inactivo
                    </StatusOption>
                  </StatusToggle>
                </StatusGroup>

                <ButtonGroup>
                  <CancelButton type="button" onClick={closeModal}>
                    Cancelar
                  </CancelButton>
                  <SubmitButton type="submit">
                    {isEditing ? "Actualizar" : "Guardar"}
                  </SubmitButton>
                </ButtonGroup>
              </Form>
            </ModalContent>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Tratamientos;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PageDescription = styled.p`
  color: #7f8c8d;
  margin: 5px 0 0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color:rgba(255, 99, 71, 0.81);
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBar = styled.div`
  flex-grow: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #ff6347;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 5px;
  }
`;

const FilterLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #7f8c8d;
  font-size: 14px;
  white-space: nowrap;
`;

const FilterButton = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => (props.active ? "#ff6347" : "#f5f5f5")};
  color: ${(props) => (props.active ? "white" : "#555")};
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#ff6347" : "#e5e5e5")};
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatsCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const StatsIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.color}20;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const StatsContent = styled.div`
  flex-grow: 1;
`;

const StatsValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
`;

const StatsLabel = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  margin-top: 5px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #2c3e50;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #2c3e50;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #555;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #4a90e2;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3a7bca;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const StatusGroup = styled.div`
  margin-top: 10px;
`;

const StatusToggle = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 8px;
`;

const StatusOption = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
  background-color: ${(props) => (props.active ? "#4A90E2" : "white")};
  color: ${(props) => (props.active ? "white" : "#555")};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
`;
