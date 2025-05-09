import React, { useState } from "react";
import {
  HeroContainer,
  ContentWrapper,
  Heading,
  ColoredText,
  SubHeading,
  DonateButton,
  ImageWrapper,
} from "../../styles/styleHeroSection";
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
      <ContentWrapper>
        <Heading>
          <ColoredText>Un pequeño</ColoredText> gesto
          <br />
          puede cambiar una vida entera.
        </Heading>
        <SubHeading>
          Porque cada sonrisa de un niño vale más de lo que imaginas.
        </SubHeading>
        <DonateButton onClick={openDonateModal}>Donar ahora</DonateButton>
      </ContentWrapper>
      <ImageWrapper>
    
      </ImageWrapper>
      <DonateModal isOpen={isModalOpen} onClose={closeDonateModal} />
    </HeroContainer>
  );
};

export default HeroSection;
