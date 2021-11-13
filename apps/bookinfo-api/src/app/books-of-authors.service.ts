import { Author, Book, BooksOfAuthors, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import util = require('util');

const prisma = new PrismaClient();

@Injectable()
export class BooksOfAuthorsService {
  public async deleteAll() {
    await prisma.booksOfAuthors.deleteMany({});
  }

  public async assignBooksToAuthors(authors: Author[], books: Book[]): Promise<BooksOfAuthors[]> {
    const assignments = [];
    authors.forEach((author) => {
      books.forEach((book) => {
        assignments.push({ authorId: author.id, bookId: book.id, assignedAt: new Date(), assignedBy: 'SYSTEM' });
      });
    });

    await prisma.booksOfAuthors.createMany({ data: assignments, skipDuplicates: true });

    return assignments;
  }
}
