import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
