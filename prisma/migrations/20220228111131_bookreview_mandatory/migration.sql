/*
  Warnings:

  - Made the column `bookId` on table `BookReview` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookReview" DROP CONSTRAINT "BookReview_bookId_fkey";

-- AlterTable
ALTER TABLE "BookReview" ALTER COLUMN "bookId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BookReview" ADD CONSTRAINT "BookReview_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
