-- CreateTable
CREATE TABLE "_AuthorToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToUser_AB_unique" ON "_AuthorToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToUser_B_index" ON "_AuthorToUser"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
