-- CreateTable
CREATE TABLE "adresses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" SMALLINT NOT NULL,
    "complement" TEXT NOT NULL,
    "typeCep" VARCHAR(100) NOT NULL,
    "neighborhoodsId" VARCHAR(100) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);
