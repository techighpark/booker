/*
  Warnings:

  - You are about to drop the column `firstName` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fullName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_fullName_key" ON "Author"("fullName");
