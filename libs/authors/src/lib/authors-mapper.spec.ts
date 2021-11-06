import { Author } from '@prisma/client';
import { AuthorDto, CreateAuthorDto } from './authors-dto';
import { AuthorsMapper } from './authors-mapper';

describe('AuthorsMapper', () => {
  it('maps to dto successfully', () => {
    const date: Date = new Date();
    const entity: Author = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: date,
      updatedAt: null,
      birthTimestamp: date,
    };

    const dto = AuthorsMapper.toDto(entity);
    expect(dto).toBeTruthy();
    expect(dto.id).toEqual('123');
    expect(dto.firstName).toEqual('John');
    expect(dto.lastName).toEqual('Doe');
    expect(dto.birthTimestamp).toEqual(date);
  });

  it('maps to entity successfully', () => {
    const date: Date = new Date();
    const dto: AuthorDto = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      birthTimestamp: date,
    };

    const entity = AuthorsMapper.toEntity(dto);
    expect(entity).toBeTruthy();
    expect(entity.id).toEqual('123');
    expect(entity.firstName).toEqual('John');
    expect(entity.lastName).toEqual('Doe');
    expect(entity.birthTimestamp).toEqual(date);
  });

  it('maps createDto to entity successfully', () => {
    const date: Date = new Date();
    const dto: CreateAuthorDto = {
      firstName: 'John',
      lastName: 'Doe',
      birthTimestamp: date,
    };

    const entity = AuthorsMapper.createDtoToEntity(dto);
    expect(entity).toBeTruthy();
    expect(entity.id).toEqual('123');
    expect(entity.firstName).toEqual('John');
    expect(entity.lastName).toEqual('Doe');
    expect(entity.birthTimestamp).toEqual(date);
  });
});
