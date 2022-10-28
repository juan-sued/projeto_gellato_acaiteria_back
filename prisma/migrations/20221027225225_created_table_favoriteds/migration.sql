-- CreateTable
CREATE TABLE "favoriteds" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "favoriteds_pkey" PRIMARY KEY ("id")
);
