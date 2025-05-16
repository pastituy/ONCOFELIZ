import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/public/login";
import Register from "./pages/public/register";
import { ThemeProvider } from "styled-components";
import Layout from "./pages/public/layout";
import { UserProvider } from "./context/userContext";
import LayoutAdmin from "./pages/private/layout";
import Events from "./pages/private/eventos";
import Camp from "./pages/private/campana";
import Noticias from "./pages/private/noticias";
import Usuario from "./pages/private/usuario";
import Donaciones from "./pages/private/donaciones";
import RegistroPaciente from "./pages/private/paciente";
import Tratamientos from "./pages/private/tratamiento";
import Recuperados from "./pages/private/donacionesCampa";
import CancerNewsChat from "./pages/private/chat";
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
    <UserProvider>
      <ThemeProvider theme={theme}>
        {/*<Navbar />
      <HeroSection />
      <BlogSection />
      <Eventos />
      <CasosRecuperados />
      <Campanas />
      <Contact />
      <Footer />*/}
        <Toaster position="bottom-right" reverseOrder={true} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dasboard" element={<LayoutAdmin />}>
              <Route path="/dasboard/eventos" element={<Events />} />
              <Route path="/dasboard/campana" element={<Camp />} />
              <Route path="/dasboard/noticias" element={<Noticias />} />
              <Route path="/dasboard/usuario" element={<Usuario />} />
              <Route path="/dasboard/donaciones" element={<Donaciones />} />
              <Route path="/dasboard/paciente" element={<RegistroPaciente />} />
              <Route path="/dasboard/tratamiento" element={<Tratamientos />} />
              <Route
                path="/dasboard/donaciones-campana"
                element={<Recuperados />}
              />
              <Route
                path="/dasboard/chat"
                element={<CancerNewsChat />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
