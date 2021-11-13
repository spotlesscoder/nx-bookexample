import { BooksOfAuthors } from '@prisma/client';
import { BooksOfAuthorsDto } from './books-of-authors-dto';

export class BooksOfAuthorsMapper {
  public static toDto(entity: BooksOfAuthors): BooksOfAuthorsDto {
    const result: BooksOfAuthorsDto = {
      assignedAt: entity.assignedAt,
      assignedBy: entity.assignedBy,
      bookId: entity.bookId,
      authorId: entity.authorId,
    };

    return result;
  }

  public static toEntity(dto: BooksOfAuthorsDto): BooksOfAuthors {
    const result: BooksOfAuthors = {
      assignedAt: dto.assignedAt,
      assignedBy: dto.assignedBy,
      bookId: dto.bookId,
      authorId: dto.authorId,
    };

    return result;
  }
}
