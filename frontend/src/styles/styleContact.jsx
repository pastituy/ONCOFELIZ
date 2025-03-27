import styled from 'styled-components';

export const ContactPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f7f6;
  padding: 4rem 5%;
`;

export const ContactSection = styled.section`
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ContactInfo = styled.div`
  flex: 1;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  color: white;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContactForm = styled.form`
  flex: 1;
  padding: 4rem 3rem;
`;

export const SectionTitle = styled.h2`
  font-family: ${props => props.theme?.fonts?.heading || "'Montserrat', sans-serif"};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: white;
`;

export const ContactInfoText = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
`;

export const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const IconWrapper = styled.span`
  margin-right: 1rem;
  color: white;
  opacity: 0.7;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

export const FormInput = styled.input`
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

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const FooterContainer = styled.footer`
  background-color: #1F2937;
  color: white;
  padding: 4rem 5%;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FooterColumn = styled.div`
  flex: 1;
  margin-right: 2rem;
  min-width: 200px;
`;

export const FooterTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const FooterLink = styled.a`
  display: block;
  color: #A0AEC0;
  margin-bottom: 0.75rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SocialIcon = styled.a`
  color: #A0AEC0;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

export const FooterBottom = styled.div`
  margin-top: 3rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
`;