import { Book, Prisma } from '@prisma/client';
import { BookDto, CreateBookDto } from './books-dto';
import { BooksMapper } from './books-mapper';

describe('BooksMapper', () => {
  it('maps to dto successfully', () => {
    const date: Date = new Date();
    const entity: Book = {
      id: 'book',
      createdAt: date,
      updatedAt: null,
      title: '123',
      price: new Prisma.Decimal(12),
      writeStartTimestamp: date,
      publishTimestamp: null,
    };

    const dto = BooksMapper.toDto(entity);
    expect(dto).toBeTruthy();
    expect(dto.id).toEqual('book');
    expect(dto.price).toEqual(12);
    expect(dto.publishTimestamp).toEqual(null);
    expect(dto.writeStartTimestamp).toEqual(date);
  });

  it('maps to entity successfully', () => {
    const date: Date = new Date();
    const dto: BookDto = {
      id: '123',
      title: 'Book Title',
      price: 12,
      publishTimestamp: null,
      writeStartTimestamp: date,
    };

    const entity = BooksMapper.toEntity(dto);
    expect(entity).toBeTruthy();
    expect(entity.id).toEqual('123');
    expect(entity.title).toEqual('Book Title');
    expect(entity.price).toEqual(new Prisma.Decimal(12));
    expect(entity.publishTimestamp).toEqual(null);
    expect(entity.writeStartTimestamp).toEqual(date);
  });

  it('maps createDto to entity successfully', () => {
    const date: Date = new Date();
    const dto: CreateBookDto = {
      title: 'Book Title',
      price: 12,
      publishTimestamp: null,
      writeStartTimestamp: date,
    };

    const entity = BooksMapper.createDtoToEntity(dto);
    expect(entity).toBeTruthy();
    expect(entity.id).toEqual('123');
    expect(entity.title).toEqual('Book Title');
    expect(entity.price).toEqual(new Prisma.Decimal(12));
    expect(entity.createdAt).toEqual(null);
    expect(entity.updatedAt).toEqual(null);
    expect(entity.publishTimestamp).toEqual(null);
    expect(entity.writeStartTimestamp).toEqual(date);
  });
});
