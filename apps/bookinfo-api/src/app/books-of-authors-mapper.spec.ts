import { BooksOfAuthors } from '@prisma/client';
import { BooksOfAuthorsDto } from './books-of-authors-dto';
import { BooksOfAuthorsMapper } from './books-of-authors-mapper';

describe('BooksOfAuthorsMapper', () => {
  it('maps to dto successfully', () => {
    const date = new Date();
    const entity: BooksOfAuthors = {
      assignedAt: date,
      assignedBy: 'hallo',
      bookId: 'as',
      authorId: '1221',
    };

    const dto = BooksOfAuthorsMapper.toDto(entity);
    expect(dto).toBeTruthy();
    expect(dto.assignedAt).toEqual(date);
    expect(dto.assignedBy).toEqual('hallo');
    expect(dto.bookId).toEqual('as');
    expect(dto.authorId).toEqual('1221');
  });

  it('maps to entity successfully', () => {
    const date = new Date();
    const dto: BooksOfAuthorsDto = {
      assignedAt: date,
      assignedBy: 'hallo',
      bookId: 'as',
      authorId: '1221',
    };

    const entity = BooksOfAuthorsMapper.toEntity(dto);
    expect(entity).toBeTruthy();
    expect(entity.assignedAt).toEqual(date);
    expect(entity.assignedBy).toEqual('hallo');
    expect(entity.bookId).toEqual('as');
    expect(entity.authorId).toEqual('1221');
  });
});
