-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "idCategoria" INTEGER;

-- AlterTable
ALTER TABLE "Campana" ADD COLUMN     "recaudado" DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
