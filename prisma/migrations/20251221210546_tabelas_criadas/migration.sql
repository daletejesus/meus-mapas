-- CreateTable
CREATE TABLE "Teste" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teste_pkey" PRIMARY KEY ("id")
);
