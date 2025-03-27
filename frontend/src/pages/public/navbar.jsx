import React from "react";
import {
  HeaderContainer,
  ContributeButton,
  Logo,
  Nav,
  NavItem,
} from "../../styles/styleNav";

const Navbar = () => {
  return (
    <HeaderContainer>
      <Logo>
        <span>Onco</span>
        <span>Feliz</span>
      </Logo>
      <Nav>
        <NavItem active>Inicio</NavItem>
        <NavItem>Blog</NavItem>
        <NavItem>Casos</NavItem>
        <NavItem>Eventos</NavItem>
        <NavItem>Campañas</NavItem>
        <NavItem>Contacto</NavItem>
      </Nav>
      <ContributeButton>
        <span>❤️</span> Donar
      </ContributeButton>
    </HeaderContainer>
  );
};

export default Navbar;
