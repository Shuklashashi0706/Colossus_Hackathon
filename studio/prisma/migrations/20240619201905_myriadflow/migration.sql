-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "managerId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoImage" TEXT NOT NULL,
    "brandRepresentative" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "brandInfo" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "collectionName" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phygital" (
    "id" SERIAL NOT NULL,
    "phygitalName" TEXT NOT NULL,
    "categories" TEXT[],
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "royalty" TEXT,
    "image" TEXT NOT NULL,
    "productInfo" TEXT NOT NULL,
    "colours" TEXT[],
    "size" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "usage" TEXT,
    "uniqueQuality" TEXT,
    "manufacturer" TEXT NOT NULL,
    "madeIn" TEXT NOT NULL,
    "contractAddress" TEXT,
    "graphURL" TEXT,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "Phygital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "variant" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phygitalId" TEXT NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebXR" (
    "id" SERIAL NOT NULL,
    "image360" TEXT NOT NULL,
    "customizations" TEXT[],
    "freeNftImage" TEXT,
    "goldReward" TEXT NOT NULL,
    "silverReward" TEXT NOT NULL,
    "bronzeReward" TEXT NOT NULL,
    "phygitalId" TEXT NOT NULL,

    CONSTRAINT "WebXR_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_walletAddress_key" ON "Manager"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brandName_key" ON "Brand"("brandName");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_collectionName_key" ON "Collection"("collectionName");

-- CreateIndex
CREATE UNIQUE INDEX "Phygital_phygitalName_key" ON "Phygital"("phygitalName");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("brandName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phygital" ADD CONSTRAINT "Phygital_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("collectionName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_phygitalId_fkey" FOREIGN KEY ("phygitalId") REFERENCES "Phygital"("phygitalName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebXR" ADD CONSTRAINT "WebXR_phygitalId_fkey" FOREIGN KEY ("phygitalId") REFERENCES "Phygital"("phygitalName") ON DELETE RESTRICT ON UPDATE CASCADE;
