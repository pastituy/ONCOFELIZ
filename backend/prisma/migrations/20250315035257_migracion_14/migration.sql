-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ci" TEXT,
    "rol" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donaciones" (
    "id" SERIAL NOT NULL,
    "nombreDonante" TEXT NOT NULL,
    "cantidad" TEXT NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Padre" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,

    CONSTRAINT "Padre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "tipoCancer" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "idPadre" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tratamiento" (
    "id" SERIAL NOT NULL,
    "tipoTratamiento" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "siguienteCita" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tratamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campana" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "multimedia" TEXT NOT NULL,

    CONSTRAINT "Campana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioCompana" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER,
    "nombreUsuario" TEXT,
    "montoSuscripcion" INTEGER NOT NULL,
    "idCompana" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuarioCompana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentarios" (
    "id" SERIAL NOT NULL,
    "comentario" TEXT NOT NULL,
    "idBlog" INTEGER NOT NULL,

    CONSTRAINT "Comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respuesta" (
    "id" SERIAL NOT NULL,
    "respuesta" TEXT NOT NULL,
    "idComentario" INTEGER NOT NULL,

    CONSTRAINT "respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idPadre_fkey" FOREIGN KEY ("idPadre") REFERENCES "Padre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCompana" ADD CONSTRAINT "UsuarioCompana_idCompana_fkey" FOREIGN KEY ("idCompana") REFERENCES "Campana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCompana" ADD CONSTRAINT "UsuarioCompana_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_idBlog_fkey" FOREIGN KEY ("idBlog") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuesta" ADD CONSTRAINT "respuesta_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Comentarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
