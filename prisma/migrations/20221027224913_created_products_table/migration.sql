-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR(70) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");
