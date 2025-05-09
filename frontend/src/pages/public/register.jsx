import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    telefono: "",
    ci: "",
    pais: "",
    rol: "voluntario",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        toast.error("Error al crear usuario");
      }
      const data = await response.json();
      if (data.status === 400) {
        return toast.error(data.mensaje);
      }
      toast.success(data.mensaje);
      setFormData({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
        telefono: "",
        ci: "",
        pais: "",
        rol: "voluntario",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
  };

  return (
    <Container>
      <RegisterCard>
        <RegisterContent>
          <SectionTitle>
            Crear <TitleAccent>Cuenta</TitleAccent>
          </SectionTitle>
          <Subtitle>Event Manager</Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputRow>
              <FormGroup>
                <FormLabel>Nombre completo</FormLabel>
                <FormInput
                  type="text"
                  name="nombre"
                  placeholder="Ingresa tu nombre completo"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Correo electrónico</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="nombre@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </InputRow>
            <InputRow>
              <FormGroup>
                <FormLabel>Telefono</FormLabel>
                <FormInput
                  type="number"
                  name="telefono"
                  placeholder="Ingrese telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Carnet</FormLabel>
                <FormInput
                  type="number"
                  name="ci"
                  placeholder="Ingrese carnet"
                  value={formData.ci}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </InputRow>
            <FormGroup>
              <FormLabel>Pais</FormLabel>
              <FormInput
                type="text"
                name="pais"
                placeholder="Ingrese el pais"
                value={formData.pais}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <InputRow>
              <FormGroup>
                <FormLabel>Contraseña</FormLabel>
                <FormInput
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormInput
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </InputRow>

            <TermsSection>
              <Checkbox
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                required
              />
              <TermsLabel htmlFor="terms">
                Acepto los{" "}
                <TermsLink href="#">términos y condiciones</TermsLink>
              </TermsLabel>
            </TermsSection>

            <RegisterButton type="submit">
              {loading ? "Cargando..." : "Crear cuenta"}
            </RegisterButton>

            <SignInSection>
              <SignInText>¿Ya tienes una cuenta?</SignInText>
              <SignInLink href="#" onClick={handleLoginClick}>
                Iniciar sesión
              </SignInLink>
            </SignInSection>
          </Form>
        </RegisterContent>
      </RegisterCard>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f7f6;
  padding: 2rem 5%;
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 650px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const RegisterContent = styled.div`
  padding: 4rem 3rem;
`;

const SectionTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  }
`;

const TitleAccent = styled.span`
  color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  }
`;

const TermsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
`;

const TermsLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const TermsLink = styled.a`
  color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SignInSection = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SignInText = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const SignInLink = styled.a`
  color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  text-decoration: none;
  margin-left: 0.25rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
const InputRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
