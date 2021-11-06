import { Author } from '@prisma/client';
import { AuthorDto } from './authors-dto';

export class AuthorsMapper {
  public static toDto(author: Author): AuthorDto {
    const result: AuthorDto = {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      birthTimestamp: author.birthTimestamp,
    };

    return result;
  }

  public static toEntity(authorDto: AuthorDto): Author {
    const result: Author = {
      id: authorDto.id,
      firstName: authorDto.firstName,
      lastName: authorDto.lastName,
      birthTimestamp: authorDto.birthTimestamp,
    };

    return result;
  }
}
