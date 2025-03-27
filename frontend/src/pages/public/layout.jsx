import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Navbar from "./navbar";
const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (link) => {
    const id = link.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };
  const NavLinkes = [
    {
      name: "Inicio",
      link: "#inicio",
    },
    {
      name: "Blog",
      link: "#blog",
    },
    {
      name: "Casos",
      link: "#casos",
    },
    {
      name: "Eventos",
      link: "#eventos",
    },
    {
      name: "Compañas",
      link: "#campanas",
    },
    {
      name: "Contacto",
      link: "#contacto",
    },
  ];
  return (
    <Componentes>
      <Navbar />
      <DivOutles>
        <Outlet />
      </DivOutles>
    </Componentes>
  );
};

export default Layout;

const Componentes = styled.div`
  width: 100vw;
  height: 100vh;
`;
const DivOutles = styled.div`
  width: 100%;
  height: 100%;
`;
