import { AuthorsService } from '@bookexample/authors';
import { BooksService } from '@bookexample/books';
import { User } from '@bookexample/users';
import { ChronoUnit, IllegalArgumentException, ZonedDateTime } from '@js-joda/core';
import { Injectable } from '@nestjs/common';
import { Author, Book, BooksOfAuthors, Prisma } from '@prisma/client';
import { BooksOfAuthorsService } from './books-of-authors.service';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';

@Injectable()
export class AppService {
  constructor(private authorsService: AuthorsService, private booksService: BooksService, private booksOfAuthorsService: BooksOfAuthorsService) {}

  public async handleCreateAutoBiographyCommand(createAutobiographyProcessDto: CreateAutobiographyProcessDto, user: User): Promise<BooksOfAuthors[]> {
    const birthDate: ZonedDateTime = ZonedDateTime.parse(createAutobiographyProcessDto.authorBirthTimestamp.toISOString());
    const writeStartTimestamp: ZonedDateTime = ZonedDateTime.parse(createAutobiographyProcessDto.writeStartTimestamp.toISOString());

    const years: number = birthDate.until(writeStartTimestamp, ChronoUnit.YEARS);
    if (years < 30) {
      throw new IllegalArgumentException('Write start timestamp must be at least 30 years apart from birth timestamp');
    }

    const author: Author = await this.authorsService.createAuthor({
      firstName: createAutobiographyProcessDto.authorFirstName,
      lastName: createAutobiographyProcessDto.authorLastName,
      birthTimestamp: createAutobiographyProcessDto.authorBirthTimestamp,
      createdAt: new Date(),
      updatedAt: null,
      id: null,
    });

    const book: Book = await this.booksService.createBook({
      id: null,
      price: createAutobiographyProcessDto.bookPrice ? new Prisma.Decimal(createAutobiographyProcessDto.bookPrice) : null,
      title: createAutobiographyProcessDto.bookTitle,
      createdAt: new Date(),
      updatedAt: null,
      writeStartTimestamp: createAutobiographyProcessDto.writeStartTimestamp,
      publishTimestamp: createAutobiographyProcessDto.publishTimestamp,
    });

    this.booksService.publishBookWithId(book.id);

    const booksOfAuthors = this.booksOfAuthorsService.assignBooksToAuthors([author], [book]);

    console.log(booksOfAuthors);

    return booksOfAuthors;
  }

  getData(): { message: string } {
    return { message: 'Welcome to bookinfo-api!' };
  }
}
