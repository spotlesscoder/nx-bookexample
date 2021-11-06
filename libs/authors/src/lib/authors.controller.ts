import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Author } from '@prisma/client';
import { AuthorDto, CreateAuthorDto } from './authors-dto';
import { AuthorsMapper } from './authors-mapper';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  public async getAuthors() {
    const result: AuthorDto[] = [];

    const authors: Author[] = await this.authorsService.getAuthors();
    if (authors && authors.length > 0) {
      authors.forEach((author) => {
        result.push(AuthorsMapper.toDto(author));
      });
    }

    return result;
  }

  @Post()
  public async create(@Body() authorDto: CreateAuthorDto) {
    let result: AuthorDto = null;

    if (authorDto) {
      let author: Author = AuthorsMapper.createDtoToEntity(authorDto);
      author = await this.authorsService.createAuthor(author);

      if (author) {
        result = AuthorsMapper.toDto(author);
      }
    }

    return result;
  }

  @Put()
  public async update(@Body() authorDto: AuthorDto) {
    let result: AuthorDto = null;

    if (authorDto) {
      let author: Author = AuthorsMapper.toEntity(authorDto);
      author = await this.authorsService.updateAuthor(author);

      if (author) {
        result = AuthorsMapper.toDto(author);
      }
    }

    return result;
  }
}
