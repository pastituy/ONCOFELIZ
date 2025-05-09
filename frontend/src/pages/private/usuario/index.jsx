import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaRegFilePdf } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import Table from "../../../components/ui/table";
import toast from "react-hot-toast";

const Usuarios = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({});
  const isFetched = useRef(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    pais: "",
    password: "",
    ci: "",
    rol: "donante",
  });
  const [usuarios, setUsuarios] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuario");
      const data = await response.json();
      setUsuarios(data.data);
      if (!response.ok) {
        toast.error(data.mensaje || "Error al obtener usuarios");
        return;
      }
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Error al obtener usuarios");
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      getData();
      isFetched.current = true;
    }
  }, []);

  const resetForm = () => {
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      pais: "",
      password: "",
      ci: "",
      rol: "donante",
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

  const editarUsuario = (data) => {
    setForm({
      nombre: data.nombre || "",
      email: data.email || "",
      telefono: data.telefono || "",
      pais: data.pais || "",
      password: "", // opcional, puedes dejar vacío para no sobrescribir
      ci: data.ci || "",
      rol: data.rol || "donante",
    });
    setItem(data);
    setIsEditing(true);
    setShowModal(true);
  };

  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/usuario/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) return toast.error(data.mensaje || "Error al eliminar usuario");
      getData();
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Error al eliminar usuario");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3000/usuario/${item.id}`
      : `http://localhost:3000/usuario`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) return toast.error(data.mensaje || "Error al guardar");
      getData();
      closeModal();
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Error al guardar");
    }
  };

  const exportToExcel = () => alert("Exportando a Excel...");
  const exportToPDF = () => alert("Exportando a PDF...");

  const columns = [
    { header: "Nombre", acceso: "nombre" },
    { header: "Email", acceso: "email" },
    { header: "Teléfono", acceso: "telefono" },
    { header: "País", acceso: "pais" },
    { header: "CI", acceso: "ci" },
    { header: "Rol", acceso: "rol" },
  ];

  return (
    <Container>
      <TopSection>
        <DateFile>
          <LoginButton onClick={openModal}>Agregar</LoginButton>
          <ButtonExcel onClick={exportToExcel}>
            <PiMicrosoftExcelLogoFill color="#2ba84a" style={{ fontSize: "1.4rem" }} />
            Excel
          </ButtonExcel>
          <ButtonPDF onClick={exportToPDF}>
            <FaRegFilePdf color="#f25c54" style={{ fontSize: "1rem" }} />
            PDF
          </ButtonPDF>
        </DateFile>
      </TopSection>

      <Table columns={columns} data={usuarios} onDelete={eliminarUsuario} onEdit={editarUsuario} />

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h2>{isEditing ? "Editar Usuario" : "Agregar Usuario"}</h2>
              <CloseButton onClick={closeModal}>
                <IoCloseOutline size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <Form onSubmit={handleSubmit}>
                {["nombre", "email", "telefono", "pais", "password", "ci"].map((field) => (
                  <FormGroup key={field}>
                    <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    <Input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleInputChange}
                      required={field !== "ci"}
                    />
                  </FormGroup>
                ))}

                <FormGroup>
                  <Label>Rol</Label>
                  <Select name="rol" value={form.rol} onChange={handleInputChange} required>
                    <option value="donante">Donante</option>
                    <option value="voluntario">Voluntario</option>
                  </Select>
                </FormGroup>

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

export default Usuarios;

const Container = styled.div`
  padding: 20px;
`;
const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  background-color: #fff;
  color: #333;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
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
  max-width: 500px;
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
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  padding: 8px 15px;
  border: none;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;