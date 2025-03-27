import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/public/login";
import Register from "./pages/public/register";
import Navbar from "./pages/public/navbar";
import HeroSection from "./pages/public/heroSection";
import { ThemeProvider } from "styled-components";
import BlogSection from "./pages/public/sectionBlog";
import Eventos from "./pages/public/eventos";
import CasosRecuperados from "./pages/public/casosRecuperados";
import Campanas from "./pages/public/campanas";
import Contact from "./pages/public/contact";
import Footer from "./pages/public/footer";
import Layout from "./pages/public/layout";
const theme = {
  colors: {
    primary: "#FF6347", // Coral color similar a la imagen
    secondary: "#F8A136", // Color naranja/amarillo del círculo
    accent: "#3A7BBF", // Azul del contorno
    dark: "#1F2937", // Color oscuro para el fondo
    light: "#FFFFFF", // Color claro para textos
    text: "#333333", // Color para textos principales
  },
  fonts: {
    main: "'Poppins', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "1024px",
  },
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <HeroSection/>
      <BlogSection/>
      <Eventos/>
      <CasosRecuperados/>
      <Campanas/>
      <Contact/>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
