const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

async function main() {
  const categorias = [
    { nombre: 'proceso niños' },
    { nombre: 'recuperacion niños' },
    { nombre: 'informacion basica' },
    { nombre: 'casos de niños' },
  ]

  for (const categoria of categorias) {
    await prisma.categoria.create({
      data: categoria,
    })
  }

  console.log('Seed completado.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
