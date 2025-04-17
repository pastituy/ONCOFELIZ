import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        toast.error(data.mensaje || "Error al iniciar sesion");
        return;
      }
      login(data.data, data.token);
      toast.success("Inicio de sesion exitoso");
      navigate("/dasboard");
    } catch (error) {
      toast.error("Hubo un problema al iniciar sesion");
    }
  };

  return (
    <Container>
      <LoginCard>
        <LoginContent>
          <SectionTitle>
            Iniciar <TitleAccent>Sesión</TitleAccent>
          </SectionTitle>
          <Subtitle>Event Manager</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Correo electrónico</FormLabel>
              <FormInput
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Contraseña</FormLabel>
              <FormInput
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <ForgotPasswordLink href="#">
              ¿Olvidaste tu contraseña?
            </ForgotPasswordLink>

            <LoginButton type="submit">Iniciar sesión</LoginButton>

            <SignUpSection>
              <SignUpText>¿No tienes una cuenta?</SignUpText>
              <SignUpLink href="#" onClick={handleRegisterClick}>
                Crear cuenta nueva
              </SignUpLink>
            </SignUpSection>
          </Form>
        </LoginContent>
      </LoginCard>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f7f6;
  padding: 2rem 5%;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LoginContent = styled.div`
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

const ForgotPasswordLink = styled.a`
  text-align: right;
  color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
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

const SignUpSection = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const SignUpText = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const SignUpLink = styled.a`
  color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  text-decoration: none;
  margin-left: 0.25rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
