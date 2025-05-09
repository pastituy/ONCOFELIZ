import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaRegFilePdf } from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { MdAdd, MdDelete } from "react-icons/md";
import Table from "../../../components/ui/table";
import toast from "react-hot-toast";

const Noticias = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    excerpt: "",
    autor: "",
    imagen: "",
    idCategoria: "",
    tags: [],
    contenidos: [{ titulo: "", texto: "", orden: 0 }]
  });
  const [dataEvento, setDataEvento] = useState([]); // Guardar datos de la API

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleContenidoChange = (index, field, value) => {
    const newContenidos = [...form.contenidos];
    newContenidos[index] = { ...newContenidos[index], [field]: value };
    setForm({ ...form, contenidos: newContenidos });
  };

  const addContenido = () => {
    setForm({
      ...form,
      contenidos: [...form.contenidos, { titulo: "", texto: "", orden: form.contenidos.length }]
    });
  };

  const removeContenido = (index) => {
    const newContenidos = [...form.contenidos];
    newContenidos.splice(index, 1);
    // Reordenar los índices
    const reorderedContenidos = newContenidos.map((contenido, idx) => ({
      ...contenido,
      orden: idx
    }));
    setForm({ ...form, contenidos: reorderedContenidos });
  };

  const addTag = () => {
    if (newTag && !form.tags.includes(newTag)) {
      setForm({ ...form, tags: [...form.tags, newTag] });
      setNewTag("");
    }
  };

  const removeTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setDataEvento(data.data);
      if (!response.ok) {
        toast.error(data.mensaje || "Error al obtener las noticias");
        return;
      }
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al obtener las noticias");
    }
  };

  const getCategorias = async () => {
    try {
      const response = await fetch("http://localhost:3000/categorias", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCategorias(data.data || []);
    } catch (error) {
      toast.error("Error al cargar las categorías");
    }
  };

  const getAllTags = async () => {
    try {
      const response = await fetch("http://localhost:3000/tags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTags(data.data || []);
    } catch (error) {
      toast.error("Error al cargar los tags");
    }
  };

  useEffect(() => {
    getData();
    getCategorias();
    getAllTags();
  }, []);

  const resetForm = () => {
    setForm({
      titulo: "",
      excerpt: "",
      autor: "",
      imagen: "",
      idCategoria: "",
      tags: [],
      contenidos: [{ titulo: "", texto: "", orden: 0 }]
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

  const editarEvento = (data) => {
    // Preparar el formulario con los datos existentes
    setForm({
      titulo: data.titulo || "",
      excerpt: data.excerpt || "",
      autor: data.autor || "",
      imagen: data.imagen || "",
      idCategoria: data.idCategoria || "",
      tags: data.tags?.map(tag => tag.nombre) || [],
      contenidos: data.contenidos || [{ titulo: "", texto: "", orden: 0 }]
    });

    setItem(data);
    setIsEditing(true);
    setShowModal(true);
  };

  const eliminarEvento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.mensaje || "Error al eliminar noticia");
        return;
      }
      getData();
      toast.success(data.mensaje);
    } catch (error) {
      toast.error("Hubo un problema al eliminar");
    }
  };

  const exportToExcel = () => {
    alert("Exportando a Excel...");
  };

  const exportToPDF = () => {
    alert("Exportando a PDF...");
  };

  const handleAgregar = async (e) => {
    e.preventDefault();

    // Validar que todos los campos obligatorios estén llenos
    if (!form.titulo || !form.excerpt || !form.autor) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    if (form.contenidos.some(contenido => !contenido.titulo || !contenido.texto)) {
      toast.error("Todos los contenidos deben tener título y texto");
      return;
    }

    if (isEditing) {
      try {
        const response = await fetch(`http://localhost:3000/blog/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const result = await response.json();
        if (!response.ok) {
          toast.error(result.mensaje || "Error al editar noticia");
          return;
        }
        getData();
        closeModal();
        toast.success(result.mensaje);
      } catch (error) {
        toast.error("Hubo un problema al editar la noticia");
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const result = await response.json();
        if (!response.ok) {
          toast.error(result.mensaje || "Error al crear una noticia");
          return;
        }
        getData();
        closeModal();
        toast.success(result.mensaje);
      } catch (error) {
        toast.error("Hubo un problema al crear la noticia");
      }
    }
  };

  const columns = [
    {
      header: "Título",
      acceso: "titulo",
    },
    {
      header: "Extracto",
      acceso: "excerpt",
    },
    {
      header: "Autor",
      acceso: "autor",
    },
    {
      header: "Categoría",
      acceso: "categoria.nombre",
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
          <LoginButton onClick={openModal}>Agregar</LoginButton>
          <ButtonExcel onClick={exportToExcel}>
            <PiMicrosoftExcelLogoFill
              color="#2ba84a"
              style={{ fontSize: "1.4rem" }}
            />
            Excel
          </ButtonExcel>
          <ButtonPDF onClick={exportToPDF}>
            <FaRegFilePdf color="#f25c54" style={{ fontSize: "1rem" }} />
            PDF
          </ButtonPDF>
        </DateFile>
      </TopSection>

      <Table
        columns={columns}
        data={dataEvento}
        onDelete={eliminarEvento}
        onEdit={editarEvento}
      />

      {showModal && (
        <ModalOverlay>
          <ModalLarge>
            <ModalHeader>
              <h2>{isEditing ? "Editar Noticia" : "Agregar Noticia"}</h2>
              <CloseButton onClick={closeModal}>
                <IoCloseOutline size={24} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <Form onSubmit={handleAgregar}>
                <FormGrid>
                  <FormGroup>
                    <Label>Título*</Label>
                    <Input
                      type="text"
                      name="titulo"
                      value={form.titulo}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Extracto (Resumen corto)*</Label>
                    <TextArea
                      name="excerpt"
                      value={form.excerpt}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Autor*</Label>
                    <Input
                      type="text"
                      name="autor"
                      value={form.autor}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>URL de la Imagen</Label>
                    <Input
                      type="text"
                      name="imagen"
                      value={form.imagen}
                      onChange={handleInputChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Categoría</Label>
                    <Select
                      name="idCategoria"
                      value={form.idCategoria}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Tags</Label>
                    <TagInputContainer>
                      <TagInput
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Agregar tag"
                      />
                      <AddTagButton type="button" onClick={addTag}>
                        Añadir
                      </AddTagButton>
                    </TagInputContainer>
                    <TagsContainer>
                      {form.tags.map((tag, index) => (
                        <Tag key={index}>
                          {tag}
                          <RemoveTagButton onClick={() => removeTag(tag)}>
                            ×
                          </RemoveTagButton>
                        </Tag>
                      ))}
                    </TagsContainer>
                  </FormGroup>
                </FormGrid>

                <SectionTitle>Contenido</SectionTitle>
                <ContenidoSection>
                  {form.contenidos.map((contenido, index) => (
                    <ContenidoContainer key={index}>
                      <ContenidoHeader>
                        <h4>Sección {index + 1}</h4>
                        {form.contenidos.length > 1 && (
                          <RemoveContenidoButton
                            type="button"
                            onClick={() => removeContenido(index)}
                          >
                            <MdDelete size={20} />
                          </RemoveContenidoButton>
                        )}
                      </ContenidoHeader>
                      <FormGroup>
                        <Label>Título de la sección*</Label>
                        <Input
                          type="text"
                          value={contenido.titulo}
                          onChange={(e) =>
                            handleContenidoChange(index, "titulo", e.target.value)
                          }
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Texto*</Label>
                        <TextArea
                          value={contenido.texto}
                          onChange={(e) =>
                            handleContenidoChange(index, "texto", e.target.value)
                          }
                          rows={5}
                          required
                        />
                      </FormGroup>
                    </ContenidoContainer>
                  ))}
                  <AddContenidoButton type="button" onClick={addContenido}>
                    <MdAdd size={20} /> Agregar sección
                  </AddContenidoButton>
                </ContenidoSection>

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
          </ModalLarge>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Noticias;

// Estilos existentes mantenidos y nuevos estilos agregados
const Container = styled.div`
  padding: 20px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DateFile = styled.div`
  display: flex;
  gap: 10px;
`;

const LoginButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0069d9;
  }
`;

const ButtonExcel = styled.button`
  background-color: white;
  color: #2ba84a;
  border: 1px solid #2ba84a;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ButtonPDF = styled.button`
  background-color: white;
  color: #f25c54;
  border: 1px solid #f25c54;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
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
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalLarge = styled(Modal)`
  width: 800px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 1.25rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  padding: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const CancelButton = styled.button`
  background-color: #f8f9fa;
  color: #212529;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const ContenidoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContenidoContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
`;

const ContenidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h4 {
    margin: 0;
  }
`;

const RemoveContenidoButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: #f8d7da;
  }
`;

const AddContenidoButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: #218838;
  }
`;

const TagInputContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const TagInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  flex-grow: 1;
`;

const AddTagButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const Tag = styled.div`
  background-color: #e9ecef;
  color: #495057;
  border-radius: 16px;
  padding: 4px 10px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;