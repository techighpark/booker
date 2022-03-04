/*
  Warnings:

  - A unique constraint covering the columns `[authorId,title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Book_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Book_authorId_title_key" ON "Book"("authorId", "title");
