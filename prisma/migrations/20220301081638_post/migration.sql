/*
  Warnings:

  - A unique constraint covering the columns `[bookId,userId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bookId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_bookId_userId_key" ON "Post"("bookId", "userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
