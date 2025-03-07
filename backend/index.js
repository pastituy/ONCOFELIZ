const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

app.post("/usuarios", async (req, res) => {
  const { nombre, email } = req.body;
  const nuevoUsuario = await prisma.usuario.create({
    data: { nombre, email },
  });
  res.json(nuevoUsuario);
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
