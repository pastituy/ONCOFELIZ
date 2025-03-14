import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <Container>
      <FormCard>
        <FormContent>
          <Title>Crear cuenta</Title>
          <Subtitle>Event Manager</Subtitle>

          <Form>
            <InputGroup>
              <Label>Nombre completo</Label>
              <StyledInput
                type="text"
                placeholder="Ingresa tu nombre completo"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Correo electrónico</Label>
              <StyledInput
                type="email"
                placeholder="nombre@ejemplo.com"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Contraseña</Label>
              <StyledInput
                type="password"
                placeholder="••••••••"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Confirmar contraseña</Label>
              <StyledInput
                type="password"
                placeholder="••••••••"
                required
              />
            </InputGroup>

            <TermsSection>
              <Checkbox type="checkbox" id="terms" required />
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
        </FormContent>
      </FormCard>
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const FormContent = styled.div`
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 10px 0 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const TermsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const TermsLabel = styled.label`
  font-size: 14px;
  color: #4a5568;
`;

const TermsLink = styled.a`
  color: #667eea;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SignInSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SignInText = styled.span`
  font-size: 14px;
  color: #4a5568;
`;

const SignInLink = styled.a`
  font-size: 14px;
  color: #667eea;
  text-decoration: none;
  margin-left: 4px;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;