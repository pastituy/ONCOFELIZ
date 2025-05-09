-- CreateTable
CREATE TABLE "Recuperados" (
    "id" SERIAL NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "recovered" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recuperados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recuperados" ADD CONSTRAINT "Recuperados_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
