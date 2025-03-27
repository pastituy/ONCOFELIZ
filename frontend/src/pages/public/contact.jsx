import React from 'react';
import { 
  ContactPageContainer, 
  ContactSection, 
  ContactInfo, 
  ContactForm,
  SectionTitle,
  ContactInfoText,
  ContactDetail,
  IconWrapper,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton
} from '../../styles/styleContact';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado');
  };

  return (
    <ContactPageContainer>
      <ContactSection>
        <ContactInfo>
          <SectionTitle>Contáctanos</SectionTitle>
          <ContactInfoText>
            Estamos aquí para ayudarte. Si tienes alguna pregunta o quieres colaborar, no dudes en contactarnos.
          </ContactInfoText>
          <ContactDetail>
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </IconWrapper>
            +52 (55) 1234 5678
          </ContactDetail>
          <ContactDetail>
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </IconWrapper>
            contacto@oncofeliz.org
          </ContactDetail>
          <ContactDetail>
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </IconWrapper>
            Ciudad de Bolivia, Cochabamba
          </ContactDetail>
        </ContactInfo>
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Nombre</FormLabel>
            <FormInput type="text" placeholder="Tu nombre" required />
          </FormGroup>
          <FormGroup>
            <FormLabel>Correo Electrónico</FormLabel>
            <FormInput type="email" placeholder="tu@email.com" required />
          </FormGroup>
          <FormGroup>
            <FormLabel>Mensaje</FormLabel>
            <FormTextarea placeholder="Escribe tu mensaje aquí" required></FormTextarea>
          </FormGroup>
          <SubmitButton type="submit">Enviar Mensaje</SubmitButton>
        </ContactForm>
      </ContactSection>
    </ContactPageContainer>
  );
};


export default Contact;