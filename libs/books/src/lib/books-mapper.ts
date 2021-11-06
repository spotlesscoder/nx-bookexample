import { Book, Prisma } from '.prisma/client';
import { BookDto, CreateBookDto } from './books-dto';

export class BooksMapper {
  public static toDto(book: Book): BookDto {
    const result: BookDto = {
      id: book.id,
      title: book.title,
      price: book.price ? book.price.toNumber() : null,
      writeStartTimestamp: book.writeStartTimestamp,
      publishTimestamp: book.publishTimestamp,
    };

    return result;
  }

  public static toEntity(bookDto: BookDto): Book {
    const result: Book = {
      id: bookDto.id,
      createdAt: new Date(),
      updatedAt: null,
      title: bookDto.title,
      price: bookDto.price ? new Prisma.Decimal(bookDto.price) : null,
      publishTimestamp: bookDto.publishTimestamp,
      writeStartTimestamp: bookDto.writeStartTimestamp,
    };

    return result;
  }

  public static createDtoToEntity(bookDto: CreateBookDto): Book {
    const result: Book = {
      id: null,
      title: bookDto.title,
      price: bookDto.price ? new Prisma.Decimal(bookDto.price) : null,
      publishTimestamp: bookDto.publishTimestamp,
      writeStartTimestamp: bookDto.writeStartTimestamp,
      createdAt: new Date(),
      updatedAt: null,
    };

    return result;
  }
}
