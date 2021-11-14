import { AuthorsService } from '@bookexample/authors';
import { BooksService } from '@bookexample/books';
import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { BooksOfAuthorsService } from './books-of-authors.service';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';
import { InvalidBirthAndWriteStartRangeException } from './invalid-birth-and-write-start-range';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, AuthorsService, BooksService, BooksOfAuthorsService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('createAutoBiography', () => {
    it('should throw exception on too short time range between birth date and write start', async () => {
      const createDto: CreateAutobiographyProcessDto = {
        authorFirstName: 'herbert',
        authorLastName: 'mueller',
        authorBirthTimestamp: new Date('2021-09-01T12:00:00.000Z'),
        writeStartTimestamp: new Date('2021-09-01T12:00:00.000Z'),
        publishTimestamp: null,
        bookTitle: 'hallo',
        bookPrice: 1.99,
      };
      expect(service.handleCreateAutoBiographyCommand(createDto, null)).rejects.toThrow(InvalidBirthAndWriteStartRangeException);
    });
  });

  describe('getData', () => {
    it('should return "Welcome to bookinfo-api!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to bookinfo-api!',
      });
    });
  });
});
