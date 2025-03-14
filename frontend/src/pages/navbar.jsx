import React from "react";
import {
  HeaderContainer,
  ContributeButton,
  Logo,
  Nav,
  NavItem,
} from "../styles/styleNav";

const Navbar = () => {
  return (
    <HeaderContainer>
      <Logo>
        <span>Dono</span>
        <span>rity</span>
      </Logo>
      <Nav>
        <NavItem active>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Pages</NavItem>
        <NavItem>Causes</NavItem>
        <NavItem>Shop</NavItem>
        <NavItem>Blog</NavItem>
        <NavItem>Contact</NavItem>
      </Nav>
      <ContributeButton>
        <span>❤️</span> Contribute
      </ContributeButton>
    </HeaderContainer>
  );
};

export default Navbar;
