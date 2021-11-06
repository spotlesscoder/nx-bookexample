import { Test } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BooksService],
      controllers: [BooksController],
    }).compile();

    controller = module.get(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
