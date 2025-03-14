import styled from 'styled-components';

export const HeroContainer = styled.section`
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f4;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50%;
    background-color: ${props => props.theme.colors.dark};
    border-radius: 0 0 0 150px;
    z-index: 1;
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      width: 100%;
      border-radius: 0;
      height: 40%;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80%;
    background: url('/path-to-wave-bg.svg') no-repeat;
    background-size: cover;
    z-index: 0;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 8rem 5% 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
    align-items: center;
    padding-top: 12rem;
  }
`;

export const Heading = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

export const ColoredText = styled.span`
  color: ${props => props.theme.colors.primary};
`;

export const SubHeading = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.9;
`;

export const DonateButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 100px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 99, 71, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    align-self: center;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 320px;
    height: 320px;
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 50%;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 350px;
    height: 350px;
    border: 15px solid ${props => props.theme.colors.accent};
    border-radius: 50%;
    z-index: -2;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-top: 2rem;
    
    &::before, &::after {
      width: 250px;
      height: 250px;
    }
  }
`;
