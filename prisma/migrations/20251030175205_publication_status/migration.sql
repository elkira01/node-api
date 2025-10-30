-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('PUBLISHED', 'DRAFT');

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "status" "PublicationStatus" NOT NULL DEFAULT 'DRAFT';
