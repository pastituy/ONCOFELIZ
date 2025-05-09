/*
  Warnings:

  - You are about to drop the column `idCategoria` on the `Blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_idCategoria_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "idCategoria",
ADD COLUMN     "categoriaId" INTEGER,
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
