/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_serialNumber_key" ON "Recipe"("serialNumber");
