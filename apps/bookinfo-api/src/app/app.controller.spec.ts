import { AuthorsService } from '@bookexample/authors';
import { BooksService } from '@bookexample/books';
import { UsersService } from '@bookexample/users';
import { Test, TestingModule } from '@nestjs/testing';
import { Author } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BooksOfAuthorsService } from './books-of-authors.service';
import { CreateAutobiographyProcessDto } from './create-autobiography-process-dto';

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule;

  const mockUsersService = {};
  const authServiceMock = {};
  const authorsServiceMock = {
    createAuthor(author: Author): Promise<Author> {
      return new Promise<Author>((resolve, reject) => {
        setTimeout(() => {
          resolve({
            birthTimestamp: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            firstName: 'as',
            lastName: 'ass',
            id: '12',
          });
        }, 1500);
      });
    },
  };
  const booksServiceMock = {};
  const booksOfAuthorsServiceMock = {};

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: UsersService, useValue: mockUsersService },
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        { provide: AuthService, useValue: authServiceMock },
        { provide: AuthorsService, useValue: authorsServiceMock },
        { provide: BooksService, useValue: booksServiceMock },
        { provide: BooksOfAuthorsService, useValue: booksOfAuthorsServiceMock },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  it('should create an autobiography', () => {
    const createDto: CreateAutobiographyProcessDto = {
      authorBirthTimestamp: new Date(),
      authorFirstName: 'hallo',
      authorLastName: 'hallo',
      bookPrice: 1.2,
      bookTitle: 'hallo',
      publishTimestamp: new Date(),
      writeStartTimestamp: new Date(),
    };
    expect(
      appController.letAuthorBeBornWriteAndPublishBook(createDto, {
        user: { id: 12 },
      })
    ).toEqual({
      id: expect.any(String),
    });
  });

  describe('getData', () => {
    it('should return "Welcome to bookinfo-api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to bookinfo-api!',
      });
    });
  });
});
