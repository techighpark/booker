/*
  Warnings:

  - You are about to drop the column `authorReview` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `bookReview` on the `Review` table. All the data in the column will be lost.
  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorReview",
DROP COLUMN "bookReview",
ADD COLUMN     "review" TEXT NOT NULL,
ALTER COLUMN "bookId" DROP NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
