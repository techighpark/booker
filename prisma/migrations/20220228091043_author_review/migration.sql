/*
  Warnings:

  - A unique constraint covering the columns `[authorId,userId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_authorId_userId_key" ON "Review"("authorId", "userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
