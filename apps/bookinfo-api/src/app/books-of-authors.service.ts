import { Author, Book, BooksOfAuthors, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();

@Injectable()
export class BooksOfAuthorsService {
  assignBooksToAuthors(authors: Author[], books: Book[]): BooksOfAuthor[] {
    const assignments: BooksOfAuthors[] = [];
    authors.forEach((author) => {
      books.forEach(async (book) => {
        const assignment: BooksOfAuthors = {
          authorId: author.id,
          bookId: book.id,
          assignedAt: new Date(),
          assignedBy: 'SYSTEM',
        };

        assignments.push(
          await prisma.booksOfAuthors.create({ data: assignment })
        );
      });
    });
    return assignments;
  }
}
