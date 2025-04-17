const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const Usuario = require("./controllers/usuario");
const Donaciones = require("./controllers/donaciones");
const Evento = require("./controllers/evento");
const Paciente = require("./controllers/paciente");
const Padre = require("./controllers/padre");
const Tratamiento = require("./controllers/tratamiento");
const blog = require("./controllers/blog");
const campana = require("./controllers/campana");
const categoria = require("./controllers/categoria");
const comentarios = require("./controllers/comentarios");
const respuesta = require("./controllers/respuesta");
const usuarioCompana = require("./controllers/usuarioCompana");
const app = express();

app.use(express.json());
app.use(cors());

app.use(Usuario);
app.use(Donaciones);
app.use(Evento);
app.use(Paciente);
app.use(Padre);
app.use(Tratamiento);
app.use(blog);
app.use(campana);
app.use(categoria);
app.use(comentarios);
app.use(respuesta);
app.use(usuarioCompana);

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
