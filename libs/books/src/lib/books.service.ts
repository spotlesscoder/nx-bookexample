import { Book, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();

@Injectable()
export class BooksService {
  public async deleteAll() {
    await prisma.book.deleteMany({});
  }

  public getBooks(): Promise<Book[]> {
    return prisma.book.findMany();
  }

  public createBook(book: Book): Promise<Book> {
    return prisma.book.create({
      data: {
        title: book.title,
        price: book.price,
        writeStartTimestamp: book.writeStartTimestamp,
        publishTimestamp: book.publishTimestamp,
      },
    });
  }

  public updateBook(book: Book): Promise<Book> {
    return prisma.book.update({ where: { id: book.id }, data: book });
  }

  public async publishBookWithId(bookId: string): Promise<Book> {
    const existingBook: Book = await prisma.book.findFirst({
      where: { id: bookId },
    });

    if (existingBook) {
      return prisma.book.update({
        where: { id: bookId },
        data: {
          publishTimestamp: new Date(),
        },
      });
    }
  }
}
