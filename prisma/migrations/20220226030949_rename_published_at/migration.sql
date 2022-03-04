/*
  Warnings:

  - You are about to drop the column `publication` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publication",
ADD COLUMN     "publishedAt" INTEGER;
