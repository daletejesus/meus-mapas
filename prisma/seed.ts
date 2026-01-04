import { prisma } from './prisma-client'

async function seed() {
    await prisma.ponto.deleteMany();
    await prisma.mapa.deleteMany();
    console.log("Seed executada com sucesso!")
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect())