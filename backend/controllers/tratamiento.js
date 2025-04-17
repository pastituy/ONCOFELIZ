const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/tratamiento", async (req, res) => {
  try {
    const tratamiento = await prisma.tratamiento.findMany({});
    res.json({
      data: tratamiento,
      mensaje: "tratamientos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer tratamiento",
      error: error.mensaje,
    });
  }
});

app.get("/tratamiento/:id", async (req, res) => {
  try {
    const tratamiento = await prisma.tratamiento.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: tratamiento,
      mensaje: "tratamiento obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer tratamiento",
      error: error.mensaje,
    });
  }
});
app.post("/tratamiento", async (req, res) => {
  try {
    const tratamientoCreado = await prisma.tratamiento.create({
      data: req.body,
    });

    res.json({
      mensaje: "tratamiento creado correctamente",
      data: tratamientoCreado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear tratamiento",
      error: error.mensaje,
    });
  }
});
app.put("/tratamiento/:id", async (req, res) => {
  try {
    const tratamiento = await prisma.tratamiento.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      mensaje: "tratamiento actualizado correcamente",
      data: tratamiento,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al editar tratamiento",
      error: error.mensaje,
    });
  }
});
app.delete("/tratamiento/:id", async (req, res) => {
  try {
    await prisma.tratamiento.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      mensaje: "tratamiento eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar tratamiento",
      error: error.mensaje,
    });
  }
});

module.exports = app;
