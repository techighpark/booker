/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Author_fullName_key" ON "Author"("fullName");
