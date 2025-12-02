/*
  Warnings:

  - Added the required column `amount` to the `TestModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestModel" ADD COLUMN     "amount" INTEGER NOT NULL;
