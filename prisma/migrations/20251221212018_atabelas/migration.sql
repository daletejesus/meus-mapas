/*
  Warnings:

  - You are about to drop the `Teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Teste";

-- CreateTable
CREATE TABLE "Mapa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Mapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ponto" (
    "id" SERIAL NOT NULL,
    "idPonto" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Ponto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "Ponto_idPonto_fkey" FOREIGN KEY ("idPonto") REFERENCES "Mapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
