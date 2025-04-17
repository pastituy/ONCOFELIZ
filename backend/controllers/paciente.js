const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/paciente", async (req, res) => {
  try {
    const paciente = await prisma.paciente.findMany({});
    res.json({
      data: paciente,
      mensaje: "pacientes obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer paciente",
      error: error.mensaje,
    });
  }
});

app.get("/paciente/:id", async (req, res) => {
  try {
    const paciente = await prisma.paciente.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: paciente,
      mensaje: "paciente obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer paciente",
      error: error.mensaje,
    });
  }
});
app.post("/paciente", async (req, res) => {
  try {
    const pacienteCreado = await prisma.paciente.create({
      data: req.body,
    });

    res.json({
      mensaje: "paciente creado correctamente",
      data: pacienteCreado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear paciente",
      error: error.mensaje,
    });
  }
});
app.put("/paciente/:id", async (req, res) => {
  try {
    const paciente = await prisma.paciente.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      mensaje: "paciente actualizado correcamente",
      data: paciente,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al editar paciente",
      error: error.mensaje,
    });
  }
});
app.delete("/paciente/:id", async (req, res) => {
  try {
    await prisma.paciente.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      mensaje: "paciente eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar paciente",
      error: error.mensaje,
    });
  }
});

module.exports = app;
