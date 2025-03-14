import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Navbar from './pages/navbar'
const theme = {
  colors: {
    primary: '#FF6347', // Coral color similar a la imagen
    secondary: '#F8A136', // Color naranja/amarillo del círculo
    accent: '#3A7BBF', // Azul del contorno
    dark: '#1F2937', // Color oscuro para el fondo
    light: '#FFFFFF', // Color claro para textos
    text: '#333333', // Color para textos principales
  },
  fonts: {
    main: "'Poppins', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
  }
};
function App() {
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Navbar />
    <HeroSection />
  
  </ThemeProvider>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />} >
        </Route>
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter> */}
  )
}

export default App
