import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <Container>
      <FormCard>
        <FormContent>
          <Title>Iniciar sesión</Title>
          <Subtitle>Event Manager</Subtitle>

          <Form>
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

            <ForgotPassword href="#">
              ¿Olvidaste tu contraseña?
            </ForgotPassword>

            <LoginButton type="submit">
              Iniciar sesión
            </LoginButton>

            <SignUpSection>
              <SignUpText>¿No tienes una cuenta?</SignUpText>
              <SignUpLink href="#" onClick={handleRegisterClick}>
                Crear cuenta nueva
              </SignUpLink>
            </SignUpSection>
          </Form>
        </FormContent>
      </FormCard>
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

const ForgotPassword = styled.a`
  font-size: 14px;
  color: #667eea;
  text-decoration: none;
  text-align: right;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
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

const SignUpSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SignUpText = styled.span`
  font-size: 14px;
  color: #4a5568;
`;

const SignUpLink = styled.a`
  font-size: 14px;
  color: #667eea;
  text-decoration: none;
  margin-left: 4px;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;