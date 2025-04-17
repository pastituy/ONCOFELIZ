const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const app = express();
const prisma = new PrismaClient();

app.get("/blog", async (req, res) => {
  try {
    const blog = await prisma.blog.findMany({});
    res.json({
      data: blog,
      mensaje: "blogs obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer blog",
      error: error.mensaje,
    });
  }
});

app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: blog,
      mensaje: "blog obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer blog",
      error: error.mensaje,
    });
  }
});
app.post("/blog", async (req, res) => {
  try {
    const blogCreado = await prisma.blog.create({
      data: req.body,
    });

    res.json({
      mensaje: "blog creado correctamente",
      data: blogCreado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear blog",
      error: error.mensaje,
    });
  }
});
app.put("/blog/:id", async (req, res) => {
  try {
    const blog = await prisma.blog.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      mensaje: "blog actualizado correcamente",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al editar blog",
      error: error.mensaje,
    });
  }
});
app.delete("/blog/:id", async (req, res) => {
  try {
    await prisma.blog.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      mensaje: "blog eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar blog",
      error: error.mensaje,
    });
  }
});

module.exports = app;
