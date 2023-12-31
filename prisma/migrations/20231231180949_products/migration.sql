-- CreateTable
CREATE TABLE "Producto" (
    "id_product" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "typeProduct" (
    "id_type" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productos" INTEGER,

    CONSTRAINT "typeProduct_pkey" PRIMARY KEY ("id_type")
);

-- AddForeignKey
ALTER TABLE "typeProduct" ADD CONSTRAINT "typeProduct_productos_fkey" FOREIGN KEY ("productos") REFERENCES "Producto"("id_product") ON DELETE SET NULL ON UPDATE CASCADE;
