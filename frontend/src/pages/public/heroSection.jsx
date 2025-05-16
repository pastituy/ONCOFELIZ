import React, { useState } from "react";
import styled from "styled-components";
import DonateModal from "../../components/donateModal";


const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDonateModal = () => {
    setIsModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HeroContainer>
      <BackgroundDecoration />
      
      <ContentWrapper>
        <Heading>
          <ColoredText>Un pequeño</ColoredText> gesto
          <br />puede cambiar una vida entera.
        </Heading>
        <SubHeading>
          Porque cada sonrisa de un niño vale más de lo que imaginas. Tu donación hoy puede transformar su mañana.
        </SubHeading>
        <DonateButton onClick={openDonateModal}>Donar ahora</DonateButton>
      </ContentWrapper>
      
      <ImageWrapper>
        <ImageContainer>
          <CircleDecoration 
            size="320px" 
            bg="rgba(255, 107, 53, 0.1)" 
            zIndex={1} 
          />
          <CircleDecoration 
            size="380px" 
            border="12px solid rgba(255, 155, 90, 0.2)" 
            zIndex={0} 
          />
          <HeroImage src="https://as2.ftcdn.net/v2/jpg/02/90/86/55/1000_F_290865570_92cJ6kBDmbgz6UwJiXlptH6vM8scvb8u.jpg" alt="Niños sonriendo" />
        </ImageContainer>
        
        <FloatingElement 
          shape="circle" 
          size="70px" 
          bg="#FF6B35" 
          top="20%" 
          right="15%" 
          opacity="0.2"
          float="-20px"
          duration="7s"
        />
        <FloatingElement 
          shape="circle" 
          size="40px" 
          bg="#FF9D6C" 
          bottom="15%" 
          left="10%" 
          opacity="0.3"
          float="-15px"
          duration="5s"
        />
        <FloatingElement 
          shape="square" 
          size="30px" 
          bg="#FF8C5A" 
          top="70%" 
          right="25%" 
          opacity="0.2"
          rotate="10deg"
          float="-10px"
          duration="8s"
          delay="1s"
        />
        <FloatingElement 
          shape="square" 
          size="25px" 
          bg="#FF6B35" 
          top="30%" 
          left="10%" 
          opacity="0.2"
          rotate="15deg"
          float="-12px"
          duration="6s"
          delay="2s"
        />
      </ImageWrapper>
      
      <DonateModal isOpen={isModalOpen} onClose={closeDonateModal} />
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.section`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background: linear-gradient(145deg, #ffffff 60%, #fff2ec 100%);
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 5% 4rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 5rem 5% 3rem;
    align-items: center;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 0 2rem 4rem;
  }
`;

const Heading = styled.h1`
  font-size: 4.5rem;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 1.5rem;
  position: relative;
  
  @media (max-width: 1024px) {
    font-size: 3.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const ColoredText = styled.span`
  color: #FF6B35;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 107, 53, 0.2);
    z-index: -1;
    
    @media (max-width: 768px) {
      height: 6px;
      bottom: 3px;
    }
  }
`;

const SubHeading = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 500px;
  color: #555;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0 auto 2.5rem;
  }
`;

const DonateButton = styled.button`
  background-color: #FF6B35;
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
    
    &::before {
      transform: translateX(100%);
      transition: transform 0.8s ease;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    align-self: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 450px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const CircleDecoration = styled.div`
  position: absolute;
  width: ${props => props.size || '350px'};
  height: ${props => props.size || '350px'};
  border-radius: 50%;
  background: ${props => props.bg || 'transparent'};
  border: ${props => props.border || 'none'};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${props => props.zIndex || 1};
`;

const FloatingElement = styled.div`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${props => props.bg};
  border-radius: ${props => props.shape === 'circle' ? '50%' : '8px'};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  opacity: ${props => props.opacity || 0.7};
  z-index: ${props => props.zIndex || 1};
  animation: float ${props => props.duration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(${props => props.float || '-15px'}) rotate(${props => props.rotate || '5deg'});
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(135deg, #FF6B35 0%, #FF9D6C 100%);
  clip-path: polygon(100% 0, 100% 100%, 0 100%, 60% 0);
  z-index: 0;
  opacity: 0.1;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
  }
`;
