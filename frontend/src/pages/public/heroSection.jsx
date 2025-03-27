import React from 'react';
import { 
  HeroContainer, 
  ContentWrapper, 
  Heading, 
  ColoredText, 
  SubHeading, 
  DonateButton,
  ImageWrapper
} from '../../styles/styleHeroSection';

const HeroSection = () => {
  return (
    <HeroContainer>
      <ContentWrapper>
        <Heading>
          <ColoredText>Un pequeño</ColoredText> gesto 
          <br />puede cambiar una vida entera.
        </Heading>
        <SubHeading>
        Porque cada sonrisa de un niño vale más de lo que imaginas.
        </SubHeading>
        <DonateButton>Donar ahora</DonateButton>
      </ContentWrapper>
      <ImageWrapper>
      </ImageWrapper>
    </HeroContainer>
  );
};

export default HeroSection;