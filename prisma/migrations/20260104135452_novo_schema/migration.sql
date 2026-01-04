/*
  Warnings:

  - The primary key for the `Mapa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ponto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idPonto` on the `Ponto` table. All the data in the column will be lost.
  - Added the required column `idMapa` to the `Ponto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ponto" DROP CONSTRAINT "Ponto_idPonto_fkey";

-- AlterTable
ALTER TABLE "Mapa" DROP CONSTRAINT "Mapa_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Mapa_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Mapa_id_seq";

-- AlterTable
ALTER TABLE "Ponto" DROP CONSTRAINT "Ponto_pkey",
DROP COLUMN "idPonto",
ADD COLUMN     "idMapa" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ponto_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ponto_id_seq";

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "Ponto_idMapa_fkey" FOREIGN KEY ("idMapa") REFERENCES "Mapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
