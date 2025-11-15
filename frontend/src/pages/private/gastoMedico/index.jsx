import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import Table from "../../../components/ui/table";
import toast from "react-hot-toast";

const GastosMedicos = () => {
  const [showModal, setShowModal] = useState(false);
  const isFetched = useRef(false);

  const [formGasto, setFormGasto] = useState({
    pacienteId: "",
    concepto: "",
    montoTotal: "",
    montoCubierto: "",
    montoFamilia: "",
    observaciones: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(null);
  const [dataPacientes, setDataPacientes] = useState([]); // Para el select
  const [dataGastos, setDataGastos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormGasto({ ...formGasto, [name]: value });
  };

  // Obtener pacientes para el select
  const getPacientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/paciente", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDataPacientes(data.data);
      }
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
    }
  };

  const getGastos = async () => {
    try {
      const response = await fetch("http://localhost:3000/gastoMedico", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setDataGastos(data.data);
      if (!response.ok) {
        toast.error(data.mensaje || "Error al obtener los gastos");
        return;
      }
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al obtener los gastos");
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      getPacientes();
      getGastos();
      isFetched.current = true;
    }
  }, []);

  const resetForm = () => {
    setFormGasto({
      pacienteId: "",
      concepto: "",
      montoTotal: "",
      montoCubierto: "",
      montoFamilia: "",
      observaciones: "",
    });
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
    setIsEditing(false);
    setItem(null);
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (isEditing && item) {
      const montoTotalOriginal = parseFloat(item.montoTotalOriginal) || 0;
      const montoCubiertoNuevo = parseFloat(formGasto.montoCubierto) || 0;
      const montoFamiliaNuevo = parseFloat(formGasto.montoFamilia) || 0;

      if (montoCubiertoNuevo + montoFamiliaNuevo > montoTotalOriginal) {
        toast.error(
          "El monto total cubierto no puede superar lo que se debe cubrir"
        );
        return;
      }
    }
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3000/gastoMedico/${item.id}`
      : "http://localhost:3000/gastoMedico";

    // Convertir strings a números antes de enviar
    const dataToSend = {
      ...formGasto,
      pacienteId: parseInt(formGasto.pacienteId),
      montoTotal: parseFloat(formGasto.montoTotal),
      montoCubierto: parseFloat(formGasto.montoCubierto) || 0,
      montoFamilia: parseFloat(formGasto.montoFamilia) || 0,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.mensaje || "Error al guardar gasto");
        return;
      }

      getGastos();
      closeModal();
      toast.success(result.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al guardar el gasto");
    }
  };

  const editarGasto = (data) => {
    console.log(data);

    setFormGasto({
      pacienteId: data.pacienteId || "",
      concepto: data.concepto || "",
      montoTotal: data.montoTotalOriginal || "",
      montoCubierto: data.montoCubiertoOriginal || "",
      montoFamilia: data.montoFamiliaOriginal || "",
      observaciones: data.observaciones || "",
    });

    setItem(data);
    setIsEditing(true);
    setShowModal(true);
  };

  const eliminarGasto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/gastoMedico/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.mensaje || "Error al eliminar gasto");
        return;
      }
      getGastos();
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al eliminar");
    }
  };

  const columns = [
    {
      header: "Paciente",
      acceso: "pacienteNombre",
    },
    {
      header: "Concepto",
      acceso: "concepto",
    },
    {
      header: "Monto Total",
      acceso: "montoTotal",
    },
    {
      header: "Cubierto Fundación",
      acceso: "montoCubierto",
    },
    {
      header: "Cubierto Familia",
      acceso: "montoFamilia",
    },
    {
      header: "Pendiente",
      acceso: "montoPendiente",
    },
    {
      header: "Fecha",
      acceso: "fecha",
    },
  ];

  return (
    <Container>
      <TopSection>
        <DateFile>
          <LoginButton onClick={openModal}>Agregar Gasto</LoginButton>
        </DateFile>
      </TopSection>

      <Table
        columns={columns}
        data={dataGastos}
        onEdit={editarGasto}
        onDelete={eliminarGasto}
      />

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h2>{isEditing ? "Editar Gasto" : "Agregar Gasto Médico"}</h2>
              <CloseButton onClick={closeModal}>
                <IoCloseOutline size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <Form onSubmit={handleAgregar}>
                <FormGroup>
                  <Label>Paciente</Label>
                  <Select
                    name="pacienteId"
                    value={formGasto.pacienteId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar paciente</option>
                    {dataPacientes.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nombre} {paciente.apellido}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Concepto</Label>
                  <Input
                    type="text"
                    name="concepto"
                    value={formGasto.concepto}
                    onChange={handleInputChange}
                    placeholder="Ej: Quimioterapia, Medicamentos, Consulta"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Monto Total</Label>
                  <Input
                    type="number"
                    step="0.01"
                    name="montoTotal"
                    value={formGasto.montoTotal}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    disabled={isEditing} // Deshabilitar en edición
                    required
                  />
                  {isEditing && (
                    <small style={{ color: "#777", marginTop: "5px" }}>
                      No se puede editar el monto total
                    </small>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Monto Cubierto (Fundación)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    name="montoCubierto"
                    value={formGasto.montoCubierto}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Monto Familia</Label>
                  <Input
                    type="number"
                    step="0.01"
                    name="montoFamilia"
                    value={formGasto.montoFamilia}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </FormGroup>

                <FormGroupFull>
                  <Label>Observaciones</Label>
                  <TextArea
                    name="observaciones"
                    value={formGasto.observaciones}
                    onChange={handleInputChange}
                    placeholder="Observaciones adicionales..."
                    rows="3"
                  />
                </FormGroupFull>

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

export default GastosMedicos;

// Styled Components (mantengo los mismos estilos que tienes)
const Container = styled.div`
  padding: 20px;
`;

const DateFile = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: row;
`;

const LoginButton = styled.button`
  width: 120px;
  height: 35px;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #777;

  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 1;
`;

const FormGroupFull = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 2;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  grid-column: span 2;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.theme?.colors?.primaryHover || "#e5533d"};
  }
`;
