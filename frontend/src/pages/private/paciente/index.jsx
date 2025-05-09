import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import Table from "../../../components/ui/table";
import toast from "react-hot-toast";

const Pacientes = () => {
  const [showModal, setShowModal] = useState(false);
  const [formPadre, setFormPadre] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    ci: "",
    ubicacion: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(null);

  const [formPaciente, setFormPaciente] = useState({
    nombre: "",
    apellido: "",
    ciudad: "",
    tipoCancer: "",
    edad: "",
  });

  const [dataPacientes, setDataPacientes] = useState([]);

  const handleInputChangePadre = (e) => {
    const { name, value } = e.target;
    setFormPadre({ ...formPadre, [name]: value });
  };

  const handleInputChangePaciente = (e) => {
    const { name, value } = e.target;
    setFormPaciente({ ...formPaciente, [name]: value });
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/paciente", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setDataPacientes(data.data);
      if (!response.ok) {
        toast.error(data.mensaje || "Error al obtener los pacientes");
        return;
      }
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al obtener los pacientes");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const resetForm = () => {
    setFormPadre({
      nombre: "",
      apellido: "",
      telefono: "",
      ubicacion: "",
    });
    setFormPaciente({
      nombre: "",
      apellido: "",
      ciudad: "",
      tipoCancer: "",
      edad: "",
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

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3000/pacientes/${item.id}`
      : "http://localhost:3000/pacientes";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          padre: formPadre,
          paciente: formPaciente,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.mensaje || "Error al guardar paciente");
        return;
      }

      getData();
      closeModal();
      toast.success(result.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al guardar el paciente");
    }
  };
  const editarEvento = (data) => {
    console.log(data)
    setFormPadre({
      nombre: data.padreNombre || "",
      apellido: data.padreApellido || "",
      telefono: data.padreTelefono || "",
      ci: data.padreCi || "",
      ubicacion: data.padreUbicacion || "",
    });

    setFormPaciente({
      nombre: data.nombre || "",
      apellido: data.apellido || "",
      ciudad: data.ciudad || "",
      tipoCancer: data.tipoCancer || "",
      edad: data.edad || "",
    });

    setItem(data);
    setIsEditing(true);
    setShowModal(true);
  };

  const eliminarEvento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/paciente/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.mensaje || "Error al eliminar paciente");
        return;
      }
      getData();
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al iliminar");
    }
  };
  const columns = [
    {
      header: "Nombre del Paciente",
      acceso: "nombre",
    },
    {
      header: "Apellido del Paciente",
      acceso: "apellido",
    },
    {
      header: "Ciudad",
      acceso: "ciudad",
    },
    {
      header: "Tipo de Cáncer",
      acceso: "tipoCancer",
    },
    {
      header: "Edad",
      acceso: "edad",
    },
    {
      header: "Nombre del Padre",
      acceso: "padreNombre",
    },
    {
      header: "Apellido del Padre",
      acceso: "padreApellido",
    },
  ];

  return (
    <Container>
      <TopSection>
        <DateFile>
          <LoginButton onClick={openModal}>Agregar</LoginButton>
        </DateFile>
      </TopSection>

      <Table
        columns={columns}
        data={dataPacientes}
        onEdit={editarEvento}
        onDelete={eliminarEvento}
      />

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h2>Agregar Paciente y Padre</h2>
              <CloseButton onClick={closeModal}>
                <IoCloseOutline size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <Form onSubmit={handleAgregar}>
                <div>
                  <SectionTitle>Datos del Padre</SectionTitle>
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      type="text"
                      name="nombre"
                      value={formPadre.nombre}
                      onChange={handleInputChangePadre}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Apellido</Label>
                    <Input
                      type="text"
                      name="apellido"
                      value={formPadre.apellido}
                      onChange={handleInputChangePadre}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Teléfono</Label>
                    <Input
                      type="text"
                      name="telefono"
                      value={formPadre.telefono}
                      onChange={handleInputChangePadre}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>CI</Label>
                    <Input
                      type="text"
                      name="ci"
                      value={formPadre.ci}
                      onChange={handleInputChangePadre}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Ubicación</Label>
                    <Input
                      type="text"
                      name="ubicacion"
                      value={formPadre.ubicacion}
                      onChange={handleInputChangePadre}
                      required
                    />
                  </FormGroup>
                </div>
                <div>
                  <SectionTitle>Datos del Paciente</SectionTitle>
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      type="text"
                      name="nombre"
                      value={formPaciente.nombre}
                      onChange={handleInputChangePaciente}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Apellido</Label>
                    <Input
                      type="text"
                      name="apellido"
                      value={formPaciente.apellido}
                      onChange={handleInputChangePaciente}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Ciudad</Label>
                    <Input
                      type="text"
                      name="ciudad"
                      value={formPaciente.ciudad}
                      onChange={handleInputChangePaciente}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Tipo de Cáncer</Label>
                    <Input
                      type="text"
                      name="tipoCancer"
                      value={formPaciente.tipoCancer}
                      onChange={handleInputChangePaciente}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Edad</Label>
                    <Input
                      type="number"
                      name="edad"
                      value={formPaciente.edad}
                      onChange={handleInputChangePaciente}
                      required
                    />
                  </FormGroup>

                  <ButtonGroup>
                    <CancelButton type="button" onClick={closeModal}>
                      Cancelar
                    </CancelButton>
                    <SubmitButton type="submit">Guardar</SubmitButton>
                  </ButtonGroup>
                </div>
              </Form>
            </ModalContent>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Pacientes;

const Container = styled.div`
  padding: 20px;
`;

const DateFile = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: row;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.5;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonExcel = styled.button`
  width: 70px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  color: #595959;
  transition: 0.5s;
  &:hover {
    color: rgba(43, 168, 74, 0.63);
  }
`;

const ButtonPDF = styled.button`
  width: 70px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #595959;
  transition: 0.5s;
  &:hover {
    color: rgba(242, 92, 84, 0.63);
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
  max-width: 700px;
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

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
  color: #555;
`;

const SectionTitle = styled.h3`
  grid-column: span 2;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
`;

const SubmitButton = styled.button`
  grid-column: span 2;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
