/*
  Warnings:

  - A unique constraint covering the columns `[designation]` on the table `PublicationCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PublicationCategory_designation_key" ON "PublicationCategory"("designation");
