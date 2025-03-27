import React, { useState } from 'react';
import styled from 'styled-components';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Registrar', formData);
  };

  return (
    <Container>
      <RegisterCard>
        <RegisterContent>
          <SectionTitle>Crear <TitleAccent>Cuenta</TitleAccent></SectionTitle>
          <Subtitle>Event Manager</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Nombre completo</FormLabel>
              <FormInput
                type="text"
                name="fullName"
                placeholder="Ingresa tu nombre completo"
                value={formData.fullName}
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
                Acepto los <TermsLink href="#">términos y condiciones</TermsLink>
              </TermsLabel>
            </TermsSection>

            <RegisterButton type="submit">
              Crear cuenta
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
  padding: 4rem 5%;
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const RegisterContent = styled.div`
  padding: 4rem 3rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  }
`;

const TitleAccent = styled.span`
  color: ${props => props.theme?.colors?.primary || '#FF6347'};
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
    border-color: ${props => props.theme?.colors?.primary || '#FF6347'};
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
  accent-color: ${props => props.theme?.colors?.primary || '#FF6347'};
`;

const TermsLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const TermsLink = styled.a`
  color: ${props => props.theme?.colors?.primary || '#FF6347'};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
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
  color: ${props => props.theme?.colors?.primary || '#FF6347'};
  text-decoration: none;
  margin-left: 0.25rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;