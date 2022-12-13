import { AuthorsService } from '@bookexample/authors';
import { BooksService } from '@bookexample/books';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { BooksOfAuthorsService } from './books-of-authors.service';
import { CreateAutobiographyDto } from './create-autobiography-dto';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    const booksOfAuthorsService = moduleRef.get<BooksOfAuthorsService>(BooksOfAuthorsService);
    await booksOfAuthorsService.deleteAll();

    const authorsService = moduleRef.get<AuthorsService>(AuthorsService);
    await authorsService.deleteAll();

    const booksService = moduleRef.get<BooksService>(BooksService);
    await booksService.deleteAll();

    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('should create an autobiography', async () => {
    const createDto: CreateAutobiographyDto = {
      authorBirthTimestamp: new Date('1990-11-01T12:00:00.000Z'),
      authorFirstName: 'hallo',
      authorLastName: 'hallo',
      bookPrice: 1.2,
      bookTitle: 'hallo',
      publishTimestamp: new Date('2024-11-01T12:00:00.000Z'),
      writeStartTimestamp: new Date('2025-11-01T12:00:00.000Z'),
    };

    const loginReq = await request(app.getHttpServer()).post('/auth/login').send({ username: 'john', password: 'changeme' }).expect(201);
    const token = loginReq.body.access_token;

    const res = (
      await request(app.getHttpServer())
        .post('/autobiography')
        .send(createDto)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(201)
    ).body;

    expect(res.length).toEqual(1);
    expect(res[0]).toMatchObject({
      authorId: expect.any(String),
      bookId: expect.any(String),
    });

    expect(res[0].authorId.length).toEqual(25);
    expect(res[0].bookId.length).toEqual(25);
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
