/*
  Warnings:

  - You are about to drop the `_AuthorToBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthorToBook" DROP CONSTRAINT "_AuthorToBook_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToBook" DROP CONSTRAINT "_AuthorToBook_B_fkey";

-- DropTable
DROP TABLE "_AuthorToBook";

-- CreateTable
CREATE TABLE "BooksOfAuthors" (
    "authorId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "BooksOfAuthors_pkey" PRIMARY KEY ("authorId","bookId")
);

-- AddForeignKey
ALTER TABLE "BooksOfAuthors" ADD CONSTRAINT "BooksOfAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOfAuthors" ADD CONSTRAINT "BooksOfAuthors_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
